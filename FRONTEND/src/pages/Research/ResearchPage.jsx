import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Sparkles,
  BookOpen,
  Filter,
  RefreshCw,
  FileText,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Map,
  Compass,
  AlertTriangle,
  Lightbulb,
  Layers,
  Calendar,
  X,
  CheckCircle2,
  Database,
  ArrowRight,
  Zap,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LeafletMap from '../../components/map/LeafletMap';
import {
  RESEARCH_CATEGORIES,
  MOCK_RESEARCH_PAPERS,
  MOCK_EVIDENCE_ITEMS,
  MOCK_RESEARCH_GAPS,
  getFilteredResearch,
  getAIResearchResponse,
} from '../../api/researchApi';

export const ResearchPage = () => {
  const { user } = useAuth();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('West Bengal');
  const [selectedDistrict, setSelectedDistrict] = useState('Nadia');
  const [selectedBlock, setSelectedBlock] = useState('Krishnanagar');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedResearchType, setSelectedResearchType] = useState('All Types');
  const [savedPapers, setSavedPapers] = useState([]);

  // AI Assistant State
  const [aiActive, setAiActive] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Detail Modal State
  const [activeModalPaper, setActiveModalPaper] = useState(null);

  // Research Idea Generator State
  const [ideaTopic, setIdeaTopic] = useState('Land Use & Land Cover');
  const [ideaLocation, setIdeaLocation] = useState('Nadia, West Bengal');
  const [generatedIdea, setGeneratedIdea] = useState(null);

  // Timeline Active Year State
  const [activeTimelineYear, setActiveTimelineYear] = useState(2025);

  const suggestedQuestions = [
    "How has agricultural land changed in Nadia over the last 10 years?",
    "What are the major causes of land disputes in rural areas?",
    "How does urban expansion affect agricultural land?",
    "Which districts are experiencing rapid land-use change?",
    "How can land acquisition disputes be reduced?",
    "Which land governance policies have the highest impact?",
  ];

  const statesList = ['All States', 'West Bengal', 'Gujarat', 'Karnataka', 'Maharashtra', 'Punjab'];
  const districtsList = ['All Districts', 'Nadia', 'Ahmedabad', 'Bengaluru Urban', 'Ahmednagar'];
  const yearsList = ['All Years', '2025', '2024', '2023', '2022'];
  const researchTypesList = ['All Types', 'GIS Study', 'Academic Research', 'Policy Study', 'Government Report', 'Field Study'];

  // Handle Search & Filter submit
  const filteredPapers = getFilteredResearch({
    category: selectedCategory,
    state: selectedState,
    district: selectedDistrict,
    year: selectedYear,
    researchType: selectedResearchType,
    searchKeyword: searchQuery,
  });

  const handleQuestionClick = (question) => {
    setSearchQuery(question);
    triggerAiSearch(question);
  };

  const triggerAiSearch = (q = searchQuery) => {
    if (!q) return;
    setAiLoading(true);
    setAiActive(true);
    setTimeout(() => {
      const resp = getAIResearchResponse(q, `${selectedDistrict}, ${selectedState}`);
      setAiResponse(resp);
      setAiLoading(false);
    }, 600);
  };

  const toggleSavePaper = (id) => {
    if (savedPapers.includes(id)) {
      setSavedPapers(savedPapers.filter((item) => item !== id));
    } else {
      setSavedPapers([...savedPapers, id]);
    }
  };

  const handleGenerateIdea = () => {
    setGeneratedIdea({
      title: `Impact of ${ideaTopic} Transformations on Land Governance in ${ideaLocation}`,
      problem: `Unplanned shifting of land usage leads to tenure insecurity, ecosystem pressure, and micro-boundary litigation in local agrarian communities.`,
      questions: [
        `What is the quantitative rate of land transition over the past 5 years?`,
        `How do current record-of-rights align with spatial drone observations?`,
        `What policy interventions can mitigate agricultural land conversion?`
      ],
      dataNeeded: ['Sentinel-2 LULC Time-series', 'Cadastral Plot Boundaries', 'Block Agriculture Census'],
      gisLayers: ['LULC Multi-spectral Raster', 'Panchayat Village Boundaries', 'Road Network Infrastructure'],
      methodology: 'Multi-criteria GIS spatial modeling combined with ground-truthed household survey data.',
      outcome: 'A predictive land stability index map and evidence-based policy recommendation draft for district officers.'
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedState('West Bengal');
    setSelectedDistrict('Nadia');
    setSelectedYear('All Years');
    setSelectedResearchType('All Types');
  };

  return (
    <div className="space-y-8 text-left pb-12 font-sans">
      {/* 1. HEADER / BREADCRUMB */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Link to="/dashboard/public" className="hover:underline">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 font-normal">Research</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0f766e] p-6 rounded-3xl text-white shadow-md">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span>National Land Research Platform</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Land Research Intelligence
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Explore evidence, discover insights, and understand India's land systems through spatial data, academic studies, and AI intelligence.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <p className="text-xs text-emerald-200 uppercase font-semibold">Indexed Papers</p>
              <p className="text-xl font-bold">1,480+</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <p className="text-xs text-emerald-200 uppercase font-semibold">Evidence Score</p>
              <p className="text-xl font-bold text-emerald-300">94.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN RESEARCH QUESTION AREA */}
      <Card className="space-y-5 border-emerald-900/20 shadow-md p-6 bg-white">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <span>What do you want to research?</span>
          </h2>
          <p className="text-xs text-slate-500">
            Ask any question about land, agriculture, policy, or land use across India.
          </p>
        </div>

        {/* Large Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && triggerAiSearch()}
              placeholder="Ask a question about land, agriculture, development, policy or land use..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 transition-all"
            />
          </div>

          <Button
            onClick={() => triggerAiSearch()}
            variant="primary"
            className="px-6 py-3 text-sm font-semibold rounded-2xl shrink-0"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Ask AI Research</span>
          </Button>
        </div>

        {/* Suggested Question Chips */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Suggested Questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(q)}
                className="text-xs bg-emerald-50/80 hover:bg-emerald-100 text-[#064e3b] px-3 py-1.5 rounded-xl border border-emerald-200/80 font-medium transition-colors text-left"
              >
                💡 {q}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 3. LOCATION & RESEARCH CONTEXT SELECTOR */}
      <Card className="bg-slate-50 border-slate-200 p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-800 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-slate-800">Research Location Context</h3>
              <p className="text-xs text-slate-500">Filter research studies and insights by spatial hierarchy</p>
            </div>
          </div>

          {/* Location Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600">State:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl text-xs px-3 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
              >
                {statesList.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600">District:</span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl text-xs px-3 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
              >
                {districtsList.map((dst) => (
                  <option key={dst} value={dst}>{dst}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600">Block:</span>
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl text-xs px-3 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
              >
                <option value="Krishnanagar">Krishnanagar</option>
                <option value="Ranaghat">Ranaghat</option>
                <option value="Santipur">Santipur</option>
              </select>
            </div>

            <Button variant="outline" size="sm" className="text-xs rounded-xl py-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Select Area on Map</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* 4. RESEARCH TOPIC CATEGORIES */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-800" />
          <span>Research Topic Categories</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50'
            }`}
          >
            All Categories ({MOCK_RESEARCH_PAPERS.length})
          </button>

          {RESEARCH_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50'
                }`}
              >
                <span className="leading-snug">{cat.name}</span>
                <span className={`text-[10px] font-medium ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                  Explore Topics →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. AI RESEARCH ASSISTANT SECTION */}
      {aiActive && (
        <Card className="bg-gradient-to-br from-emerald-900 via-[#064e3b] to-teal-900 text-white p-6 rounded-3xl space-y-5 border-none shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-700/50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/80 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">BHOOMIVISION Research Intelligence</h3>
                <p className="text-[11px] text-emerald-200">Evidence-Grounded AI Research Synthesis</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-600">
                Confidence: {aiResponse?.confidenceScore || '92% (High Confidence)'}
              </span>
              <button
                onClick={() => setAiActive(false)}
                className="text-emerald-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {aiLoading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-emerald-300 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-semibold text-emerald-200">Synthesizing GIS layers & research evidence...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Research Question:</p>
                <p className="text-sm font-bold text-white italic">"{aiResponse?.question}"</p>
              </div>

              <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-700/60 space-y-2">
                <p className="text-xs text-emerald-300 font-bold uppercase">AI Insight Summary:</p>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  {aiResponse?.insight}
                </p>
              </div>

              {/* Related GIS Layers & Quick Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-emerald-300">Grounded Evidence Sources:</span>
                <button className="text-xs bg-emerald-800/80 hover:bg-emerald-700 px-3 py-1 rounded-xl text-emerald-100 border border-emerald-600 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-300" />
                  <span>View Evidence (3)</span>
                </button>
                <button className="text-xs bg-emerald-800/80 hover:bg-emerald-700 px-3 py-1 rounded-xl text-emerald-100 border border-emerald-600 flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5 text-emerald-300" />
                  <span>View GIS Overlay</span>
                </button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* 6. ADVANCED SEARCH & FILTERS BAR */}
      <Card className="p-4 bg-white border-slate-200 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
            <Filter className="w-4 h-4 text-emerald-800" />
            <span>Filter Research Index</span>
          </div>

          <button
            onClick={resetFilters}
            className="text-xs text-emerald-800 font-semibold hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-700 font-semibold"
            >
              {statesList.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-700 font-semibold"
            >
              {yearsList.map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Research Type</label>
            <select
              value={selectedResearchType}
              onChange={(e) => setSelectedResearchType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-700 font-semibold"
            >
              {researchTypesList.map((tp) => (
                <option key={tp} value={tp}>{tp}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Evidence Level</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-700 font-semibold">
              <option value="all">All Evidence Levels</option>
              <option value="high">High Confidence (90%+)</option>
              <option value="medium">Medium Confidence (75%+)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* 7. EXPLORE RESEARCH CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-800" />
            <span>Explore Research Studies ({filteredPapers.length})</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Showing verified academic & government studies</span>
        </div>

        {filteredPapers.length === 0 ? (
          <Card className="p-8 text-center bg-slate-50 border-dashed border-slate-300">
            <p className="text-sm font-semibold text-slate-600">No research papers match your exact filter criteria.</p>
            <button onClick={resetFilters} className="mt-2 text-xs text-emerald-800 font-bold hover:underline">
              Clear filters to view all papers
            </button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPapers.map((paper) => {
              const isSaved = savedPapers.includes(paper.id);
              return (
                <Card
                  key={paper.id}
                  className="hover:border-emerald-600 hover:shadow-md transition-all flex flex-col justify-between space-y-4 p-5"
                >
                  <div className="space-y-3">
                    {/* Card Top Metadata */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                          {paper.categoryName}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {paper.researchType}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                          {paper.evidenceStrength}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleSavePaper(paper.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSaved ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400 hover:bg-slate-100'
                        }`}
                        title={isSaved ? 'Unsave Research' : 'Save Research'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Paper Title & Summary */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-base leading-snug group-hover:text-emerald-800">
                        {paper.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {paper.summary}
                      </p>
                    </div>

                    {/* Author & Location info */}
                    <div className="text-[11px] text-slate-500 space-y-1 pt-1">
                      <p><strong>Authors/Source:</strong> {paper.source}</p>
                      <p><strong>Location:</strong> {paper.district}, {paper.state} ({paper.year})</p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Button
                      onClick={() => setActiveModalPaper(paper)}
                      variant="outline"
                      size="sm"
                      className="text-xs font-semibold rounded-xl"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Research</span>
                    </Button>

                    <button
                      onClick={() => handleQuestionClick(`Explain key findings of ${paper.title}`)}
                      className="text-xs text-emerald-800 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Ask AI About This</span>
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* 8. EVIDENCE PANEL */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>Evidence Behind the Insight</span>
          </h3>
          <p className="text-xs text-slate-500">
            Verified datasets, satellite records, and official government reports backing platform intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_EVIDENCE_ITEMS.map((item) => (
            <Card key={item.id} className="bg-emerald-50/40 border-emerald-200/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold">
                  {item.sourceType}
                </span>
                <span className="text-[11px] font-bold text-emerald-900">{item.confidence}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">{item.source} ({item.year})</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.finding}</p>
              </div>

              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Coverage: {item.coverage}</span>
                <button className="text-emerald-800 font-bold hover:underline flex items-center gap-0.5">
                  <span>View Source</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 9. GIS CONNECTION - MAP PREVIEW */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-800" />
            <span>Research on the Map</span>
          </h3>
          <p className="text-xs text-slate-500">
            Spatial distribution of active land research studies, boundary plot data, and satellite LULC overlays.
          </p>
        </div>

        <Card className="p-0 overflow-hidden border-slate-300 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Map Container */}
            <div className="lg:col-span-8 h-80 relative">
              <LeafletMap center={[23.471, 88.556]} zoom={10} className="w-full h-full" />
            </div>

            {/* Map Info Sidebar */}
            <div className="lg:col-span-4 p-6 bg-slate-900 text-white space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-800/80 text-emerald-200 text-[11px] font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Selected Study Area: Nadia District</span>
                </div>

                <h4 className="font-bold text-base text-white">Spatial Land-Use Change Overlay</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Interactive satellite vector layer mapping agricultural shrinkage vs. infrastructure growth across Krishnanagar & Ranaghat blocks.
                </p>

                <div className="space-y-1 text-xs text-slate-300">
                  <p>• <strong>Active GIS Layers:</strong> Sentinel-2 LULC, Cadastral RoR Plots</p>
                  <p>• <strong>Geographic Resolution:</strong> 10m Spatial Resolution</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <Link to="/gis-maps">
                  <Button variant="primary" className="w-full text-xs font-semibold py-2.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Full Interactive GIS Studio</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 10. RESEARCH TIMELINE */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-800" />
            <span>Research & Land Change Timeline</span>
          </h3>
          <p className="text-xs text-slate-500">
            Historical progression of land governance milestones, satellite surveys, and policy implementations.
          </p>
        </div>

        <Card className="p-6 bg-white border-slate-200 space-y-6">
          {/* Year Selector Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 overflow-x-auto">
            {[2010, 2015, 2020, 2024, 2025].map((yr) => (
              <button
                key={yr}
                onClick={() => setActiveTimelineYear(yr)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTimelineYear === yr
                    ? 'bg-[#064e3b] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Year {yr}
              </button>
            ))}
          </div>

          {/* Timeline Details Box */}
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/70 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">
              {activeTimelineYear === 2025 && '2025: Real-time Drone Cadastral Mapping & AI Record Sync'}
              {activeTimelineYear === 2024 && '2024: DILRMP Digitization Milestone & DGPS Boundary Verification'}
              {activeTimelineYear === 2020 && '2020: Baseline Sentinel-2 Multi-Spectral LULC Mapping'}
              {activeTimelineYear === 2015 && '2015: National Land Records Modernization Phase-I Rollout'}
              {activeTimelineYear === 2010 && '2010: Initial Paper RoR Digitization & Survey Baseline'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeTimelineYear === 2025 && 'High-resolution drone mapping integrated with immutable smart contracts across Nadia district. Reduced mutation disputes by 34%.'}
              {activeTimelineYear === 2024 && 'Completion of 86.4% digital record verification. Enabled evidence-based land governance dashboards across rural panchayats.'}
              {activeTimelineYear === 2020 && 'Established 10m multi-spectral baseline for monitoring agricultural land conversion and urban sprawl.'}
              {activeTimelineYear === 2015 && 'Consolidated district land registration offices with online land record search capabilities.'}
              {activeTimelineYear === 2010 && 'Transition from physical manual registers to initial digital database records.'}
            </p>
          </div>
        </Card>
      </div>

      {/* 11. RESEARCH GAP DETECTOR & NEW RESEARCH IDEA GENERATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GAP DETECTOR */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="bg-amber-50/60 border-amber-300 p-6 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Research Gap Detector</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated identification of under-researched topics, locations, and missing policy data linkages.
              </p>

              <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-2 text-left">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                  Identified Research Gap
                </span>
                <h5 className="font-bold text-xs text-slate-800">{MOCK_RESEARCH_GAPS[0].topic}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "{MOCK_RESEARCH_GAPS[0].gapSummary}"
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-200/80 flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-900">Target Area: Nadia, West Bengal</span>
              <Button
                onClick={() => {
                  setIdeaTopic('Land Disputes & Conversion');
                  handleGenerateIdea();
                }}
                variant="primary"
                size="sm"
                className="text-xs rounded-xl bg-amber-800 hover:bg-amber-900 border-none"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                <span>Generate Research Idea</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* GENERATE RESEARCH IDEA FORM & OUTPUT */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-6 space-y-4 bg-white border-slate-200">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Lightbulb className="w-5 h-5 text-emerald-800 shrink-0" />
              <span>AI Research Proposal Generator</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Topic Area</label>
                <input
                  type="text"
                  value={ideaTopic}
                  onChange={(e) => setIdeaTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Study Location</label>
                <input
                  type="text"
                  value={ideaLocation}
                  onChange={(e) => setIdeaLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800"
                />
              </div>
            </div>

            <Button
              onClick={handleGenerateIdea}
              variant="outline"
              className="w-full text-xs font-semibold py-2.5"
            >
              <Zap className="w-4 h-4 text-emerald-700" />
              <span>Generate Structured Research Proposal</span>
            </Button>

            {generatedIdea && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 text-xs text-left">
                <div>
                  <span className="text-[10px] font-bold text-emerald-900 uppercase">Generated Title:</span>
                  <h5 className="font-bold text-slate-800 text-xs mt-0.5">{generatedIdea.title}</h5>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-900 uppercase">Core Problem:</span>
                  <p className="text-slate-600">{generatedIdea.problem}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-900 uppercase">Required Datasets:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {generatedIdea.dataNeeded.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white text-emerald-800 rounded border border-emerald-300 text-[10px]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* 12. PERSONALIZED RESEARCH RECOMMENDATIONS (FOR LOGGED-IN USERS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-800" />
            <span>Recommended Research For You ({user?.name || 'Public User'})</span>
          </h3>
          <span className="text-xs text-emerald-800 font-semibold">Based on your activity in {selectedState}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_RESEARCH_PAPERS.slice(0, 2).map((paper) => (
            <Card key={`rec_${paper.id}`} className="bg-white border-emerald-900/15 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                  Recommended Study
                </span>
                <span className="text-[11px] font-semibold text-slate-500">{paper.state}</span>
              </div>
              <h4 className="font-bold text-slate-800 text-sm leading-snug">{paper.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{paper.summary}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">{paper.evidenceStrength}</span>
                <Button
                  onClick={() => setActiveModalPaper(paper)}
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-xl py-1"
                >
                  <span>Read Paper</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* RESEARCH DETAIL MODAL */}
      {activeModalPaper && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto text-left shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1 pr-4">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase">
                  {activeModalPaper.categoryName}
                </span>
                <h3 className="font-extrabold text-lg text-slate-800">{activeModalPaper.title}</h3>
                <p className="text-xs text-slate-500">{activeModalPaper.source} • ({activeModalPaper.year})</p>
              </div>
              <button
                onClick={() => setActiveModalPaper(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Abstract</h4>
                <p className="leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {activeModalPaper.abstract}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Key Research Findings</h4>
                <ul className="space-y-1.5 list-disc list-inside bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-200/70 text-emerald-950">
                  {activeModalPaper.keyFindings.map((kf, i) => (
                    <li key={i}>{kf}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Available GIS Layers</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalPaper.gisLayersAvailable.map((lyr, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-emerald-700" />
                      <span>{lyr}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                onClick={() => setActiveModalPaper(null)}
                variant="ghost"
                className="text-xs rounded-xl"
              >
                Close
              </Button>
              <Link to="/gis-maps">
                <Button variant="primary" className="text-xs rounded-xl">
                  <Map className="w-3.5 h-3.5" />
                  <span>Explore on GIS Map</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchPage;
