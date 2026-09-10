"""
AI service for BHOOMIVISION.

Wraps an OpenAI-compatible chat completion endpoint (Groq by default).
Provides:
    - summarize_research(text)
    - answer_policy_question(question, context_docs)
    - analyze_land_trends(records)

All methods degrade gracefully if AI_API_KEY is missing — callers
get a deterministic local fallback so the API never 500s.
"""
import logging
from typing import Any, Dict, List

import requests
from flask import current_app

logger = logging.getLogger(__name__)

TIMEOUT = 30


# --------------------------------------------------------------------------
# Internal helper
# --------------------------------------------------------------------------
def _chat(messages: List[Dict[str, str]], max_tokens: int = 800,
          temperature: float = 0.3) -> str:
    cfg = current_app.config
    api_key = cfg.get("AI_API_KEY")
    url = cfg.get("AI_API_URL")
    model = cfg.get("AI_MODEL")

    if not api_key:
        raise RuntimeError("AI_API_KEY not configured")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
    }
    resp = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
    resp.raise_for_status()
    data = resp.json()
    return data["choices"][0]["message"]["content"].strip()


def _truncate(text: str, max_chars: int = 8000) -> str:
    if not text:
        return ""
    return text if len(text) <= max_chars else text[:max_chars] + "..."


# --------------------------------------------------------------------------
# Public API
# --------------------------------------------------------------------------
def summarize_research(title: str, text: str) -> Dict[str, Any]:
    """Summarize a research document."""
    if not text:
        return {"summary": "", "source": "empty"}
    try:
        prompt = (
            "You are an analyst summarizing Indian land-records research "
            "for policy makers. Provide a concise 4-6 sentence summary and "
            "3 bullet key findings.\n\n"
            f"Title: {title}\n\nContent:\n{_truncate(text)}"
        )
        summary = _chat([
            {"role": "system", "content": "You are a precise research assistant."},
            {"role": "user", "content": prompt},
        ])
        return {"summary": summary, "source": "ai"}
    except Exception as exc:
        logger.warning("AI summarize failed, using fallback: %s", exc)
        # Deterministic fallback
        snippet = text.strip().split(".")[0][:300]
        return {
            "summary": f"{title}: {snippet}." if title else snippet,
            "source": "fallback",
        }


def answer_policy_question(question: str,
                           context_docs: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Answer a question grounded in retrieved policy docs."""
    if not question:
        return {"answer": "", "source": "empty", "citations": []}

    context_blocks = []
    citations = []
    for i, doc in enumerate(context_docs[:5], 1):
        title = doc.get("title") or doc.get("name") or f"Document {i}"
        body = doc.get("description") or doc.get("content") or doc.get("abstract") or ""
        context_blocks.append(f"[{i}] {title}\n{_truncate(body, 1500)}")
        citations.append({"ref": i, "title": title, "id": str(doc.get("_id", ""))})

    context = "\n\n".join(context_blocks) if context_blocks else "No context provided."

    try:
        prompt = (
            "Answer the user's question using ONLY the context below. "
            "Cite sources as [1], [2]. If the answer is not in context, say so.\n\n"
            f"Context:\n{context}\n\nQuestion: {question}"
        )
        answer = _chat([
            {"role": "system", "content": "You are a helpful land-policy analyst."},
            {"role": "user", "content": prompt},
        ], temperature=0.2)
        return {"answer": answer, "source": "ai", "citations": citations}
    except Exception as exc:
        logger.warning("AI Q&A failed, using fallback: %s", exc)
        fallback = (
            "AI service unavailable. Retrieved relevant documents:\n"
            + "\n".join(f"- {c['title']}" for c in citations)
            if citations else "No matching policy documents found."
        )
        return {"answer": fallback, "source": "fallback", "citations": citations}


def analyze_land_trends(records: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Provide qualitative analysis of land records."""
    if not records:
        return {"analysis": "No records to analyze.", "source": "empty"}

    # Deterministic local pre-analysis
    districts: Dict[str, int] = {}
    total_area = 0.0
    for r in records:
        d = r.get("district", "unknown")
        districts[d] = districts.get(d, 0) + 1
        try:
            total_area += float(r.get("area") or 0)
        except (TypeError, ValueError):
            pass

    local = {
        "total_records": len(records),
        "total_area": round(total_area, 2),
        "top_districts": sorted(districts.items(), key=lambda x: -x[1])[:5],
    }

    try:
        prompt = (
            "Analyze the following Indian land-record statistics and give "
            "3-4 actionable insights for policy makers:\n"
            f"{local}"
        )
        analysis = _chat([
            {"role": "system", "content": "You are a land-policy data analyst."},
            {"role": "user", "content": prompt},
        ])
        return {"analysis": analysis, "stats": local, "source": "ai"}
    except Exception as exc:
        logger.warning("AI trend analysis failed: %s", exc)
        return {
            "analysis": (
                f"Analyzed {local['total_records']} records covering "
                f"{local['total_area']} area units across "
                f"{len(districts)} districts."
            ),
            "stats": local,
            "source": "fallback",
        }