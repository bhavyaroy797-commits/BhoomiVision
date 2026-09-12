import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  FileText,
  Layers,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Sprout,
  Building2,
  Scale,
  TreePine,
  Map,
  BookOpen,
  Search,
  Sparkles,
  Download,
  Eye,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ExternalLink,
  Sliders,
  X,
  CheckCircle2,
  Calendar,
  Zap,
  Filter,
  RefreshCw,
  Share2,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LeafletMap from '../../components/map/LeafletMap';
import {
  REPORT_CATEGORIES,
  MOCK_REPORTS,
  MOCK_REPORT_EVIDENCE,
  getAIReportResponse,
} from '../../api/reportsApi';

export const ReportsPage = () => {
  const { user } = useAuth();

  // Active Tab & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedReports, setSavedReports] = useState([]);

  // Builder State
  const [builderState, setBuilderState] = useState('West Bengal');
  const [builderDistrict, setBuilderDistrict] = useState('Nadia');
  const [builderBlock, setBuilderBlock] = useState('Krishnanagar');
  const [builderTopic, setBuilderTopic] = useState('Land Use & Change');
  const [builderPeriod, setBuilderPeriod] = useState('2020-2025');

  // Preview Modal State
  const [activePreviewReport, setActivePreviewReport] = useState(null);

  // AI Guidance State
  const [aiActive, setAiActive] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const statesList = ['West Bengal', 'Gujarat', 'Karnataka', 'Maharashtra', 'Punjab'];
  const districtsList = ['Nadia', 'Ahmedabad', 'Bengaluru Urban', 'Ahmednagar'];

  const handleAskAI = (query = 'What is the most important finding in the Nadia Land Change Report?') => {
    setAiLoading(true);
    setAiActive(true);
    setTimeout(() => {
      const resp = getAIReportResponse(query, `${builderDistrict}, ${builderState}`);
      setAiResponse(resp);
      setAiLoading(false);
    }, 500);
  };

  const toggleSaveReport = (id) => {
    if (savedReports.includes(id)) {
      setSavedReports(savedReports.filter((item) => item !== id));
    } else {
      setSavedReports([...savedReports, id]);
    }
  };
const handleDownloadPDF = () => {
  const rep = activePreviewReport;
  if (!rep) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFillColor(6, 78, 59);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BHOOMIVISION', 15, 15);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Land Intelligence Report', 15, 23);

  // Title
  doc.setTextColor(15, 23, 42);
  y = 45;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(rep.title || 'Report', pageWidth - 30);
  doc.text(titleLines, 15, y);
  y += titleLines.length * 7 + 5;

  // Meta
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Location: ${rep.location || 'N/A'}`, 15, y); y += 5;
  doc.text(`Period: ${rep.period || 'N/A'}`, 15, y); y += 5;
  doc.text(`Evidence: ${rep.evidenceLevel || 'N/A'}`, 15, y); y += 5;
  doc.text(`Generated: ${new Date().toLocaleString()}`, 15, y); y += 10;

  // Executive Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(6, 78, 59);
  doc.text('1. Executive Summary', 15, y); y += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);
  const summaryLines = doc.splitTextToSize(rep.executiveSummary || rep.summary || '', pageWidth - 30);
  doc.text(summaryLines, 15, y);
  y += summaryLines.length * 5 + 8;

  // Key Insights
  if (rep.keyInsights && rep.keyInsights.length) {
    if (y > 240) { doc.addPage(); y = 20; }
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 78, 59);
    doc.text('2. Key Insights', 15, y); y += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    rep.keyInsights.forEach((k) => {
      const lines = doc.splitTextToSize(`• ${k}`, pageWidth - 30);
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(lines, 15, y);
      y += lines.length * 5 + 2;
    });
    y += 5;
  }

  // Evidence Sources
  if (rep.evidenceList && rep.evidenceList.length) {
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 78, 59);
    doc.text('3. Evidence Sources', 15, y); y += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    rep.evidenceList.forEach((ev) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`- ${ev}`, 15, y);
      y += 6;
    });
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `BHOOMIVISION • National Land Intelligence Platform • Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: 'center' }
    );
  }

  // Save
  const safeTitle = (rep.title || 'report').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 50);
  doc.save(`BHOOMIVISION_${safeTitle}.pdf`);
};
  const handleGenerateCustomPreview = () => {
    const customRep = {
      id: `custom_${Date.now()}`,
      title: `${builderTopic} Intelligence Report – ${builderDistrict}, ${builderState}`,
      category: 'change_report',
      categoryName: builderTopic,
      location: `${builderBlock}, ${builderDistrict}, ${builderState}`,
      period: builderPeriod,
      dataCoverage: 'GIS + Land Records + Research + Governance',
      updatedDate: 'Just Now (Generated Preview)',
      evidenceLevel: 'High Confidence (95%)',
      status: 'Generated Preview',
      summary: `Custom generated report aggregating spatial satellite observations, administrative land records, and policy frameworks for ${builderDistrict}.`,
      executiveSummary: `Illustrative AI Summary: Comprehensive multi-spectral audit for ${builderDistrict} indicates 12.4% agricultural land transformation, high mutation digitization (86.4%), and localized dispute risks.`,
      keyInsights: [
        `High built-up infrastructure expansion along primary transit corridors.`,
        `86.4% digital record completion under DILRMP scheme.`,
        `Mandatory Social Impact Assessment (SIA) active across project zones.`
      ],
      gisLayers: ['Sentinel-2 LULC Vector', 'Cadastral RoR Plot Overlay'],
      evidenceList: ['ISRO Bhuvan Satellite LULC Audit', 'Survey of India Digital Cadastral Survey'],
    };

    setActivePreviewReport(customRep);
  };

  const filteredReports = MOCK_REPORTS.filter((rep) => {
    if (selectedCategory !== 'all' && rep.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = rep.title.toLowerCase().includes(q);
      const matchLoc = rep.location.toLowerCase().includes(q);
      const matchSum = rep.summary.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchSum) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 text-left pb-12 font-sans">
      {/* 1. HEADER / BREADCRUMB WITH QUOTE CARD */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Link to="/dashboard/public" className="hover:underline">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 font-normal">Reports</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0f766e] p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
              <FileText className="w-3.5 h-3.5 text-emerald-300" />
              <span>National Land Intelligence Report Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Land Intelligence Reports
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Explore evidence-based land reports and generate location-specific insights from research, policy, governance and GIS information.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-xs text-right hidden sm:block shrink-0">
            <p className="text-xs italic font-medium text-emerald-100 leading-snug">
              "From Data to Decision-Ready Land Intelligence."
            </p>
            <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-emerald-300 mt-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BHOOMIVISION Reports Lab</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <Card className="p-4 bg-white border-emerald-900/15 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, locations, topics or land issues..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
            />
          </div>

          <Button
            onClick={() => handleAskAI(searchQuery || 'General Report Intelligence')}
            variant="primary"
            className="px-6 py-3 text-xs sm:text-sm font-semibold rounded-2xl shrink-0"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Ask Report AI</span>
          </Button>
        </div>
      </Card>

      {/* 2. REPORT OVERVIEW STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">Available Reports</p>
          <p className="text-2xl font-extrabold text-[#064e3b]">124+</p>
          <p className="text-[10px] text-emerald-700 font-medium">Indexed National Reports</p>
        </Card>

        <Card className="p-5 bg-white border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">Saved Reports</p>
          <p className="text-2xl font-extrabold text-[#064e3b]">{savedReports.length}</p>
          <p className="text-[10px] text-emerald-700 font-medium">In Local Workspace</p>
        </Card>

        <Card className="p-5 bg-white border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">Report Categories</p>
          <p className="text-2xl font-extrabold text-[#064e3b]">10</p>
          <p className="text-[10px] text-emerald-700 font-medium">Core Land Sectors</p>
        </Card>

        <Card className="p-5 bg-white border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">Locations Covered</p>
          <p className="text-2xl font-extrabold text-[#064e3b]">28 States / UTs</p>
          <p className="text-[10px] text-emerald-700 font-medium">Pan-India Geographic Scope</p>
        </Card>
      </div>

      {/* 3. REPORT CATEGORIES GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-800" />
            <span>Report Categories</span>
          </h3>
          <span className="text-xs text-slate-500">Filter reports by governance domain</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500'
            }`}
          >
            All Reports ({MOCK_REPORTS.length})
          </button>

          {REPORT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500'
                }`}
              >
                <span className="leading-snug">{cat.name}</span>
                <span className={`text-[10px] font-medium ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                  View Category →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. EXPLORE REPORTS CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-800" />
            <span>Explore Reports ({filteredReports.length})</span>
          </h3>
          {selectedCategory !== 'all' && (
            <button onClick={() => setSelectedCategory('all')} className="text-xs text-emerald-800 font-semibold hover:underline">
              Show All Reports
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((rep) => {
            const isSaved = savedReports.includes(rep.id);
            return (
              <Card key={rep.id} className="hover:border-emerald-600 hover:shadow-md transition-all p-5 bg-white space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                        {rep.categoryName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {rep.period}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                        {rep.evidenceLevel}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleSaveReport(rep.id)}
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isSaved ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Unsave Report' : 'Save Report'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-base leading-snug">{rep.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rep.summary}</p>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                    <p><strong>Location:</strong> {rep.location}</p>
                    <p><strong>Data Coverage:</strong> {rep.dataCoverage}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Button
                    onClick={() => setActivePreviewReport(rep)}
                    variant="primary"
                    size="sm"
                    className="text-xs font-semibold rounded-xl"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Report</span>
                  </Button>

                  <Button
                    onClick={() => setActivePreviewReport(rep)}
                    variant="outline"
                    size="sm"
                    className="text-xs font-semibold rounded-xl"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                    <span>View Insights</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 5. CUSTOM REPORT BUILDER ("BUILD YOUR REPORT") */}
      <Card className="p-6 bg-slate-900 text-white space-y-6 rounded-3xl shadow-xl">
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-bold border border-emerald-700">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Custom Builder</span>
          </div>
          <h3 className="text-lg font-bold text-white">Build Your Custom Land Intelligence Report</h3>
          <p className="text-xs text-slate-400">
            Configure location, topic, time period, and required spatial layers to synthesize a custom intelligence report.
          </p>
        </div>

        {/* Builder Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="block font-bold text-emerald-400 uppercase">Step 1: Location</label>
            <select
              value={builderState}
              onChange={(e) => setBuilderState(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white font-semibold"
            >
              {statesList.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            <select
              value={builderDistrict}
              onChange={(e) => setBuilderDistrict(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white font-semibold mt-2"
            >
              {districtsList.map((dst) => (
                <option key={dst} value={dst}>{dst}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-emerald-400 uppercase">Step 2: Topic</label>
            <select
              value={builderTopic}
              onChange={(e) => setBuilderTopic(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white font-semibold"
            >
              <option value="Land Use & Change">Land Use & Change</option>
              <option value="Land Governance & Disputes">Land Governance & Disputes</option>
              <option value="Land Acquisition & Policy">Land Acquisition & Policy</option>
              <option value="Agricultural Resilience">Agricultural Resilience</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-emerald-400 uppercase">Step 3: Time Period</label>
            <select
              value={builderPeriod}
              onChange={(e) => setBuilderPeriod(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white font-semibold"
            >
              <option value="2020-2025">2020–2025 (5-Year Recent)</option>
              <option value="2015-2025">2015–2025 (10-Year Decadal)</option>
              <option value="2010-2025">2010–2025 (15-Year Historical)</option>
            </select>
          </div>

          <div className="space-y-1.5 flex flex-col justify-end">
            <Button
              onClick={handleGenerateCustomPreview}
              variant="primary"
              className="w-full text-xs font-bold py-3 bg-emerald-600 hover:bg-emerald-500 border-none shadow-md"
            >
              <Zap className="w-4 h-4 text-emerald-200" />
              <span>Generate Report Preview</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* 6. AI REPORT ASSISTANT RESPONSE CARD (WHEN ACTIVE) */}
      {aiActive && (
        <Card className="bg-gradient-to-br from-emerald-950 via-[#064e3b] to-teal-950 text-white p-6 rounded-3xl space-y-4 border-none shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-700/50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/80 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">BHOOMIVISION Report Intelligence</h3>
                <p className="text-[11px] text-emerald-200">Grounded Report Synthesizer</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-600">
                Confidence: {aiResponse?.confidence || '95%'}
              </span>
              <button onClick={() => setAiActive(false)} className="text-emerald-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {aiLoading ? (
            <div className="py-6 text-center text-emerald-200 text-xs">Synthesizing report sections & evidence...</div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-emerald-300 font-semibold uppercase">Report Query:</p>
              <p className="text-sm font-bold text-white italic">"{aiResponse?.query}"</p>
              <div className="p-4 bg-emerald-900/60 rounded-2xl border border-emerald-700/60 text-xs text-emerald-100 leading-relaxed">
                {aiResponse?.insight}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* 7. EVIDENCE & SOURCE PANEL */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>Evidence Behind This Report Center</span>
          </h3>
          <p className="text-xs text-slate-500">
            Multi-source datasets backing all generated report insights and recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_REPORT_EVIDENCE.map((item) => (
            <Card key={item.id} className="bg-emerald-50/40 border-emerald-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-800 text-white text-[10px] font-bold">
                  {item.sourceType}
                </span>
                <span className="text-[11px] font-bold text-emerald-900">{item.evidenceStrength}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">{item.sourceName} ({item.year})</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.keyFinding}</p>
              </div>

              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Coverage: {item.locationCoverage}</span>
                <button className="text-emerald-800 font-bold hover:underline">View Source →</button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* REPORT PREVIEW MODAL */}
      {activePreviewReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto text-left shadow-2xl">
            {/* Modal Top Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase">
                    BHOOMIVISION LAND INTELLIGENCE REPORT PREVIEW
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                    {activePreviewReport.status}
                  </span>
                </div>
                <h3 className="font-extrabold text-xl text-slate-800">{activePreviewReport.title}</h3>
                <p className="text-xs text-slate-500">
                  Location: <strong>{activePreviewReport.location}</strong> • Period: <strong>{activePreviewReport.period}</strong>
                </p>
              </div>

              <button onClick={() => setActivePreviewReport(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="space-y-5 text-xs text-slate-700">
              {/* Executive Summary */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 text-sm">1. Executive Summary</h4>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 font-medium leading-relaxed">
                  {activePreviewReport.executiveSummary}
                </div>
              </div>

              {/* Key Insights */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 text-sm">2. Key Insights & Governance Findings</h4>
                <ul className="space-y-1.5 list-disc list-inside bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {activePreviewReport.keyInsights.map((ki, idx) => (
                    <li key={idx} className="font-medium text-slate-800">{ki}</li>
                  ))}
                </ul>
              </div>

              {/* GIS Analysis Map Preview */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 text-sm">3. Spatial GIS Map Preview</h4>
                <div className="h-56 relative rounded-2xl overflow-hidden border border-slate-300">
                  <LeafletMap center={[23.471, 88.556]} zoom={10} className="w-full h-full" />
                </div>
              </div>

              {/* Evidence & Sources */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 text-sm">4. Grounded Evidence Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {activePreviewReport.evidenceList.map((ev, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold border border-emerald-300">
                      ✓ {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 italic">
                * Export PDF feature will connect to the real Flask report engine.
              </span>

              <div className="flex items-center gap-2">
                <Button onClick={() => setActivePreviewReport(null)} variant="ghost" className="text-xs rounded-xl">
                  Close
                </Button>
                <Button onClick={handleDownloadPDF} variant="outline" 
                size="sm" className="text-xs rounded-xl">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </Button>
                <Link to="/gis-maps">
                  <Button variant="primary" size="sm" className="text-xs rounded-xl">
                    <Map className="w-3.5 h-3.5" />
                    <span>Open in GIS Map</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
