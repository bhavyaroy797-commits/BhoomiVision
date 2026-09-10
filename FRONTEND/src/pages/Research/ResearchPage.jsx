import React, { useState } from 'react';
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
  Users,
  Network,
  TrendingUp,
  Activity,
  FileSpreadsheet,
  Cpu,
  Share2,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LeafletMap from '../../components/map/LeafletMap';
import {
  RESEARCH_CATEGORIES,
  MOCK_RESEARCH_PAPERS,
  MOCK_EVIDENCE_ITEMS,
  MOCK_RESEARCH_GAPS,
  MOCK_DATASETS,
  MOCK_ACTIVE_RESEARCH_PROJECTS,
  MOCK_RESEARCH_ACTIVITIES,
  MOCK_RESEARCH_PATTERNS_CHART_DATA,
  MOCK_KNOWLEDGE_NODES,
  getFilteredResearch,
  getAIResearchResponse,
} from '../../api/researchApi';
import scarchBg from '../../../Public/assets/image/scarch.jpeg';

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
  const [savedPapers, setSavedPapers] = useState(['res_01', 'res_04']);

  // AI Assistant State
  const [aiActive, setAiActive] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Detail Modal State
  const [activeModalPaper, setActiveModalPaper] = useState(null);

  // Research Proposal Generator State
  const [ideaTopic, setIdeaTopic] = useState('Land Use & Land Cover');
  const [ideaLocation, setIdeaLocation] = useState('Nadia, West Bengal');
  const [generatedIdea, setGeneratedIdea] = useState(null);

  // Timeline Active Year State
  const [activeTimelineYear, setActiveTimelineYear] = useState(2025);

  const suggestedQuestions = [
    {
      q: 'How has agricultural land changed in Nadia over the last decade?',
      topic: 'Land Use',
      loc: 'Nadia, West Bengal',
      time: '2015–2025',
    },
    {
      q: 'What are the major socioeconomic causes of rural land disputes?',
      topic: 'Land Disputes',
      loc: 'West Bengal',
      time: '2020–2024',
    },
    {
      q: 'How does urban highway expansion impact fertile paddy topsoil?',
      topic: 'Urban Development',
      loc: 'NH-34 Corridor',
      time: '2018–2025',
    },
    {
      q: 'Which districts show high compliance with drone cadastral mapping?',
      topic: 'Land Records',
      loc: 'Karnataka & WB',
      time: '2023–2025',
    },
    {
      q: 'What is the soil organic carbon recovery under agroforestry?',
      topic: 'Environment',
      loc: 'Ahmednagar, MH',
      time: '2018–2024',
    },
    {
      q: 'How do un-updated ancestral RoRs affect land acquisition compensation?',
      topic: 'Land Acquisition',
      loc: 'Ahmedabad, GJ',
      time: '2022–2025',
    },
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

  const handleQuestionClick = (qText) => {
    setSearchQuery(qText);
    triggerAiSearch(qText);
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
        `What policy interventions can mitigate agricultural land conversion?`,
      ],
      dataNeeded: ['Sentinel-2 LULC Time-series', 'Cadastral Plot Boundaries', 'Block Agriculture Census'],
      gisLayers: ['LULC Multi-spectral Raster', 'Panchayat Village Boundaries', 'Road Network Infrastructure'],
      methodology: 'Multi-criteria GIS spatial modeling combined with ground-truthed household survey data.',
      outcome: 'A predictive land stability index map and evidence-based policy recommendation draft for district officers.',
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
    <div className="space-y-8 text-left pb-12 font-sans bg-slate-50/40 p-2 sm:p-4 rounded-3xl">
      {/* 1. COMPACT RESEARCH WORKSPACE HEADER (SECTION 5) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 border-b border-slate-200/80 pb-2">
          <div className="flex items-center gap-2">
            <Link to="/dashboard/public" className="hover:underline">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-emerald-950 font-bold">BHOOMIVISION RESEARCH WORKSPACE</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100/90 px-3 py-0.5 rounded-full border border-emerald-300">
            RESEARCHER / ANALYST PORTAL
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#064e3b] p-6 rounded-3xl text-white shadow-md relative overflow-hidden">
          {/* High-Resolution scarch.jpeg Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-100"
            style={{ backgroundImage: `url(${scarchBg})` }}
          />

          <div className="space-y-2 z-10 max-w-2xl bg-white/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/60 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064e3b] text-emerald-100 text-xs font-semibold shadow-xs">
              <Search className="w-3.5 h-3.5 text-emerald-300" />
              <span>National Land Research & Evidence Ecosystem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#064e3b]">
              Good evening, {user?.name || 'Dr. Ananya Roy'}
            </h1>
            <p className="text-[#064e3b] text-xs sm:text-sm font-semibold leading-relaxed">
              Explore evidence, discover patterns and build stronger land research across India's spatial and tenure datasets.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 z-10">
            <div className="bg-[#064e3b] backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-700/40 text-center shadow-md">
              <p className="text-[10px] text-emerald-200 uppercase font-semibold">Active Region</p>
              <p className="text-sm font-bold text-white">{selectedDistrict}, {selectedState}</p>
            </div>
            <div className="bg-[#064e3b] backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-700/40 text-center shadow-md">
              <p className="text-[10px] text-emerald-200 uppercase font-semibold">Saved Items</p>
              <p className="text-xl font-extrabold text-emerald-300">{savedPapers.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 7-STEP INTERACTIVE RESEARCH WORKFLOW & USP PIPELINE */}
      <Card className="bg-[#064e3b]/95 text-white p-4 sm:p-5 rounded-2xl shadow-sm border-none">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-emerald-700/60 pb-3 mb-3">
          <div>
            <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Research Intelligence Pipeline</p>
            <h3 className="text-xs sm:text-sm font-bold text-emerald-50">"From Research Questions to Evidence-Based Land Intelligence."</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-emerald-800/90 text-emerald-200 px-3 py-1 rounded-full font-semibold border border-emerald-600">
              Role: Researcher / Analyst ({user?.name || 'Dr. Ananya Roy'})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-[11px]">
          <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
            <span className="block font-bold text-emerald-300 text-[10px]">STEP 1</span>
            <span className="font-semibold text-white">1. Ask Question</span>
          </div>
          <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
            <span className="block font-bold text-emerald-300 text-[10px]">STEP 2</span>
            <span className="font-semibold text-white">2. Discover Studies</span>
          </div>
          <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
            <span className="block font-bold text-emerald-300 text-[10px]">STEP 3</span>
            <span className="font-semibold text-white">3. Collect Evidence</span>
          </div>
          <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
            <span className="block font-bold text-emerald-300 text-[10px]">STEP 4</span>
            <span className="font-semibold text-white">4. AI Analysis</span>
          </div>
          <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
            <span className="block font-bold text-emerald-300 text-[10px]">STEP 5</span>
            <span className="font-semibold text-white">5. GIS Layer Map</span>
          </div>
          <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
            <span className="block font-bold text-emerald-300 text-[10px]">STEP 6</span>
            <span className="font-semibold text-white">6. Identify Gaps</span>
          </div>
          <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
            <span className="block font-bold text-emerald-300 text-[10px]">STEP 7</span>
            <span className="font-semibold text-white">7. Export Proposal</span>
          </div>
        </div>
      </Card>

      {/* 3. PRIMARY RESEARCH COMMAND BAR (SECTION 6) */}
      <Card className="space-y-4 border-emerald-900/20 shadow-md p-6 bg-white rounded-3xl">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <span>Start with a Research Question</span>
          </h2>
          <p className="text-xs text-slate-500">
            Enter any research hypothesis, land-use query, or policy question to initiate automated evidence discovery.
          </p>
        </div>

        {/* Large Research Command Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && triggerAiSearch()}
              placeholder="What do you want to investigate? (e.g. How has agricultural land changed in Nadia over the last decade?)"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => triggerAiSearch()}
              variant="primary"
              className="px-5 py-3.5 text-xs font-bold rounded-2xl bg-[#064e3b] hover:bg-[#043e2f]"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Analyse</span>
            </Button>
            <Button
              onClick={() => setSearchQuery(searchQuery + ' in Nadia district')}
              variant="outline"
              className="px-4 py-3.5 text-xs font-bold rounded-2xl"
            >
              Refine Question
            </Button>
          </div>
        </div>

        {/* 4. RESEARCH QUESTION SUGGESTIONS CARDS (SECTION 7) */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Research Questions You Can Explore:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {suggestedQuestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(item.q)}
                className="p-3 bg-emerald-50/60 hover:bg-emerald-100/80 rounded-2xl border border-emerald-200/80 text-left space-y-1.5 transition-colors group"
              >
                <p className="text-xs font-bold text-[#064e3b] leading-snug group-hover:underline">💡 "{item.q}"</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                  <span>Topic: {item.topic}</span>
                  <span className="text-emerald-800">{item.loc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 5. RESEARCH SNAPSHOT ANALYTICAL STRIP (SECTION 8) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-800" />
            <span>Research Workspace Snapshot</span>
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Demo Workspace Data
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Card className="bg-white border-slate-200 p-4 text-center space-y-1">
            <p className="text-2xl font-extrabold text-[#064e3b]">23</p>
            <p className="text-[11px] font-bold text-slate-600">Topics Explored</p>
          </Card>
          <Card className="bg-white border-slate-200 p-4 text-center space-y-1">
            <p className="text-2xl font-extrabold text-emerald-700">14</p>
            <p className="text-[11px] font-bold text-slate-600">Evidence Saved</p>
          </Card>
          <Card className="bg-white border-slate-200 p-4 text-center space-y-1">
            <p className="text-2xl font-extrabold text-teal-700">08</p>
            <p className="text-[11px] font-bold text-slate-600">Datasets Analysed</p>
          </Card>
          <Card className="bg-white border-slate-200 p-4 text-center space-y-1">
            <p className="text-2xl font-extrabold text-emerald-900">05</p>
            <p className="text-[11px] font-bold text-slate-600">GIS Areas Studied</p>
          </Card>
          <Card className="bg-white border-slate-200 p-4 text-center space-y-1">
            <p className="text-2xl font-extrabold text-amber-700">03</p>
            <p className="text-[11px] font-bold text-slate-600">Potential Gaps</p>
          </Card>
        </div>
      </div>

      {/* 6. MY ACTIVE RESEARCH PROJECTS (SECTION 9) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>My Active Research Projects</span>
          </h3>
          <span className="text-xs text-slate-500">3 ongoing active investigations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_ACTIVE_RESEARCH_PROJECTS.map((proj) => (
            <Card key={proj.id} className="bg-white border-slate-200 p-5 space-y-3 hover:border-emerald-600 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#064e3b] text-[10px] font-bold">
                    {proj.location}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{proj.lastActivity}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm leading-snug">{proj.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{proj.keyFocus}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Pipeline: {proj.pipelineStep}</span>
                  <span className="text-emerald-800 font-bold">{proj.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#064e3b] h-full rounded-full" style={{ width: `${proj.progressPercent}%` }} />
                </div>
                <Button
                  onClick={() => handleQuestionClick(`Continue research on ${proj.title}`)}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-bold rounded-xl py-1.5 mt-1"
                >
                  <span>Continue Research</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 7. LOCATION & SPATIAL CONTEXT SELECTOR */}
      <Card className="bg-slate-100/70 border-slate-300 p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-800 shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Spatial Research Hierarchy</h3>
              <p className="text-xs text-slate-500">Filter datasets and research evidence by administrative boundary</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600">State:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl text-xs px-3 py-1.5 text-slate-700 font-semibold"
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
                className="bg-white border border-slate-300 rounded-xl text-xs px-3 py-1.5 text-slate-700 font-semibold"
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
                className="bg-white border border-slate-300 rounded-xl text-xs px-3 py-1.5 text-slate-700 font-semibold"
              >
                <option value="Krishnanagar">Krishnanagar</option>
                <option value="Ranaghat">Ranaghat</option>
                <option value="Santipur">Santipur</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* 8. AI RESEARCH ASSISTANT SECTION (SECTION 11 & 17) */}
      {aiActive && (
        <Card className="bg-gradient-to-br from-[#064e3b] via-[#047857] to-teal-900 text-white p-6 rounded-3xl space-y-5 border-none shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-700/50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/80 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">BHOOMIVISION AI Research Assistant</h3>
                <p className="text-[11px] text-emerald-200">Evidence-Grounded AI Synthesis (Demo AI)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-600">
                {aiResponse?.confidenceScore || '92% (High Confidence)'}
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
              <p className="text-xs font-semibold text-emerald-200">Synthesizing multi-spectral GIS layers & research papers...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Investigated Research Query:</p>
                <p className="text-sm font-bold text-white italic">"{aiResponse?.question}"</p>
              </div>

              <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-700/60 space-y-2">
                <p className="text-xs text-emerald-300 font-bold uppercase">AI Synthesis Summary (Demo AI Insight):</p>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  {aiResponse?.insight}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-emerald-300">Grounded Sources & GIS:</span>
                <button className="text-xs bg-emerald-800/80 hover:bg-emerald-700 px-3 py-1 rounded-xl text-emerald-100 border border-emerald-600 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-300" />
                  <span>View Evidence (3)</span>
                </button>
                <Link to="/gis-maps" className="text-xs bg-emerald-800/80 hover:bg-emerald-700 px-3 py-1 rounded-xl text-emerald-100 border border-emerald-600 flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Open GIS Overlay</span>
                </Link>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* 9. RESEARCH INTELLIGENCE PANEL (SECTION 11) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-800" />
            <span>Research Intelligence & Patterns</span>
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Demo Intelligence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-emerald-50/50 border-emerald-200 p-5 space-y-2">
            <span className="px-2.5 py-0.5 rounded bg-[#064e3b] text-white text-[10px] font-bold uppercase">
              PATTERN DETECTED
            </span>
            <h4 className="font-bold text-slate-800 text-xs">Corridor Urban Expansion</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Urban built-up conversion appears strongly concentrated along NH-34 development corridors in Krishnanagar."
            </p>
          </Card>

          <Card className="bg-emerald-50/50 border-emerald-200 p-5 space-y-2">
            <span className="px-2.5 py-0.5 rounded bg-[#064e3b] text-white text-[10px] font-bold uppercase">
              EVIDENCE CONNECTION
            </span>
            <h4 className="font-bold text-slate-800 text-xs">Multi-Source Verification</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              "ISRO Sentinel-2 raster layers strongly correlate with DILRMP cadastral boundary mutation delays."
            </p>
          </Card>

          <Card className="bg-emerald-50/50 border-emerald-200 p-5 space-y-2">
            <span className="px-2.5 py-0.5 rounded bg-[#064e3b] text-white text-[10px] font-bold uppercase">
              RESEARCH OPPORTUNITY
            </span>
            <h4 className="font-bold text-slate-800 text-xs">Policy Impact Assessment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Potential research gap exists for evaluating RFCTLARR compensation equity against tenant farmer displacement."
            </p>
          </Card>
        </div>
      </div>

      {/* 10. EVIDENCE DISCOVERY EXPLORER (SECTION 10) */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>Evidence Worth Exploring</span>
          </h3>
          <p className="text-xs text-slate-500">
            Verified datasets, satellite records, and official government reports backing platform intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_EVIDENCE_ITEMS.map((item) => (
            <Card key={item.id} className="bg-white border-slate-200 p-5 space-y-3 hover:border-emerald-600 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-[#064e3b] text-white text-[10px] font-bold">
                  {item.sourceType}
                </span>
                <span className="text-[11px] font-bold text-emerald-900">{item.confidence}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">{item.source} ({item.year})</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.finding}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Coverage: {item.coverage}</span>
                <button
                  onClick={() => handleQuestionClick(`Examine evidence: ${item.source}`)}
                  className="text-emerald-800 font-bold hover:underline flex items-center gap-0.5"
                >
                  <span>View Evidence</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 11. DATASET DISCOVERY EXPLORER (SECTION 12) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-800" />
              <span>Datasets for Your Research</span>
            </h3>
            <p className="text-xs text-slate-500">
              Open satellite imagery, cadastral RoR vector boundaries, soil censuses, and judicial case logs.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Demo Data Index
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_DATASETS.map((ds) => (
            <Card key={ds.id} className="bg-white border-slate-200 p-5 space-y-3 hover:border-emerald-600 transition-all">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-950 text-[10px] font-bold">
                    {ds.category}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug">{ds.name}</h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                  {ds.evidenceStatus}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{ds.description}</p>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl text-slate-600">
                <p><strong>Source:</strong> {ds.source}</p>
                <p><strong>Location:</strong> {ds.location}</p>
                <p><strong>Time Period:</strong> {ds.timePeriod}</p>
                <p><strong>Format:</strong> {ds.dataType}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-medium">{ds.availability}</span>
                <Button
                  onClick={() => handleQuestionClick(`Analyze dataset: ${ds.name}`)}
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-xl py-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Analyze Dataset</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 12. RESEARCH + GIS PREVIEW (SECTION 13) */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-800" />
            <span>See Your Research on the Map</span>
          </h3>
          <p className="text-xs text-slate-500">
            Spatial distribution of active land research studies, boundary plot data, and satellite LULC overlays.
          </p>
        </div>

        <Card className="p-0 overflow-hidden border-slate-300 shadow-md rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8 h-80 relative">
              <LeafletMap center={[23.471, 88.556]} zoom={10} className="w-full h-full" />
            </div>

            <div className="lg:col-span-4 p-6 bg-slate-900 text-white space-y-4 flex flex-col justify-between text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-800/80 text-emerald-200 text-[11px] font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Spatial Focus: Nadia District</span>
                </div>

                <h4 className="font-bold text-base text-white">Spatial Land-Use Change Overlay</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Interactive satellite vector layer mapping agricultural shrinkage vs. infrastructure growth across Krishnanagar & Ranaghat blocks.
                </p>

                <div className="space-y-1 text-xs text-slate-300">
                  <p>• <strong>Active GIS Layers:</strong> 2010, 2020, 2025 Sentinel-2 LULC</p>
                  <p>• <strong>Resolution:</strong> 10m Spatial Resolution</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <Link to="/gis-maps">
                  <Button variant="primary" className="w-full text-xs font-bold py-2.5 bg-[#064e3b] hover:bg-[#043e2f]">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open GIS Research Studio</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 13. PATTERN DISCOVERY & VISUAL CHARTS (SECTION 14) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-800" />
            <span>Patterns Across Land Data (LULC 2010–2025)</span>
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Illustrative Data
          </span>
        </div>

        <Card className="p-5 bg-white border-slate-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            {MOCK_RESEARCH_PATTERNS_CHART_DATA.map((item) => (
              <div key={item.year} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-extrabold text-[#064e3b] uppercase">Year {item.year}</span>
                <div className="space-y-1 text-xs text-slate-700 text-left">
                  <div className="flex justify-between">
                    <span>Agricultural:</span>
                    <strong className="text-emerald-800">{item.Agricultural}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Built-up:</span>
                    <strong className="text-amber-800">{item.BuiltUp}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Forest:</span>
                    <strong className="text-teal-800">{item.Forest}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Water:</span>
                    <strong className="text-sky-800">{item.Water}%</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
            <span><strong>Pattern Discovery:</strong> Built-up area expanded by +12.4% over 15 years while agricultural cropland decreased by -12.4%.</span>
            <span className="font-bold text-[10px] bg-emerald-200 px-2 py-0.5 rounded">High Confidence Pattern</span>
          </div>
        </Card>
      </div>

      {/* 14. RESEARCH GAP RADAR / MATRIX (SECTION 15) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Where Could New Research Begin? (Research Gap Radar)</span>
          </h3>
          <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
            Demo Research Gap Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_RESEARCH_GAPS.map((gap) => (
            <Card key={gap.id} className="bg-amber-50/40 border-amber-300 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-950 text-[10px] font-bold">
                  {gap.topic}
                </span>
                <span className="text-xs font-bold text-amber-900">{gap.location}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">Suggested Proposal: "{gap.suggestedTitle}"</h4>
                <p className="text-xs text-slate-600 leading-relaxed">"{gap.gapSummary}"</p>
              </div>

              <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-amber-950 font-bold">
                  <span>Coverage: Low</span>
                  <span>•</span>
                  <span>Opportunity: High</span>
                </div>
                <Button
                  onClick={() => {
                    setIdeaTopic(gap.topic);
                    handleGenerateIdea();
                  }}
                  variant="primary"
                  size="sm"
                  className="text-xs rounded-xl bg-amber-800 hover:bg-amber-900 border-none"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate Proposal</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 15. RESEARCH MAP OF KNOWLEDGE / CONNECTED GRAPH (SECTION 16) */}
      <Card className="p-6 bg-white border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-800" />
            <span>Connect the Evidence (Knowledge Map)</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-semibold">Visualizing BHOOMIVISION Core Ecosystem</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
          {MOCK_KNOWLEDGE_NODES.map((node, i) => (
            <div key={i} className={`p-3 rounded-2xl ${node.color} space-y-1 text-xs shadow-xs`}>
              <p className="font-extrabold text-[11px]">{node.label}</p>
              <p className="text-[10px] opacity-90">{node.sub}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 16. AI PROPOSAL GENERATOR WIDGET */}
      <Card className="p-6 space-y-4 bg-white border-slate-200">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-emerald-800 shrink-0" />
          <span>Structured Research Proposal Generator</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <span>Generate Structured Research Proposal Draft</span>
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

      {/* 17. RESEARCH RECOMMENDATIONS & COLLABORATION (SECTION 18 & 19) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-800" />
            <span>Recommended for Your Research</span>
          </h3>

          <div className="space-y-3">
            {MOCK_RESEARCH_PAPERS.slice(0, 2).map((paper) => (
              <Card key={`rec_${paper.id}`} className="bg-white border-slate-200 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#064e3b] text-[10px] font-bold">
                    {paper.categoryName}
                  </span>
                  <span className="text-[10px] text-slate-500">{paper.state}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-xs leading-snug">{paper.title}</h4>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500">{paper.evidenceStrength}</span>
                  <Button
                    onClick={() => setActiveModalPaper(paper)}
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-xl py-0.5"
                  >
                    Read Paper
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-800" />
            <span>Research Collaboration & Knowledge Sharing</span>
          </h3>

          <Card className="bg-white border-slate-200 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#064e3b] text-white flex items-center justify-center text-xs font-bold">
                3+
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs">Active Collaboration Opportunities</h4>
                <p className="text-xs text-slate-500">3 researchers are currently exploring similar LULC topics in West Bengal.</p>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-2xl text-xs space-y-1 text-emerald-950">
              <p><strong>NIRDPR Research Group:</strong> Gangetic Basin Land Tenure Study</p>
              <p className="text-slate-600">Shared Datasets: Sentinel-2 Raster 2024, RoR Mutation Index</p>
            </div>

            <Button variant="outline" className="w-full text-xs font-semibold py-2">
              <Share2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Join Research Knowledge Group</span>
            </Button>
          </Card>
        </div>
      </div>

      {/* 18. RECENT RESEARCH ACTIVITY TIMELINE & QUICK TOOLS (SECTION 20, 21, 22) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-800" />
            <span>Research Activity Notebook</span>
          </h3>

          <Card className="bg-white border-slate-200 p-5 space-y-3">
            {MOCK_RESEARCH_ACTIVITIES.map((act, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-none last:pb-0 text-xs">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px] shrink-0">
                  {act.time}
                </span>
                <div>
                  <p className="font-semibold text-slate-800">{act.action}</p>
                  <span className="text-[10px] text-emerald-800 font-bold">{act.category} Activity</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-800" />
            <span>Turn Your Research Into a Report</span>
          </h3>

          <Card className="bg-gradient-to-br from-[#064e3b] to-emerald-900 text-white p-6 rounded-3xl space-y-4 shadow-md">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded bg-emerald-800 text-emerald-200 text-[10px] font-bold uppercase">
                Publish Research Output
              </span>
              <h4 className="font-bold text-base text-white">Generate Evidence Report</h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Consolidate your research question, evidence sources, GIS raster layers, and AI insights into a exportable PDF/HTML report.
              </p>
            </div>

            <Link to="/reports" className="block">
              <Button variant="primary" className="w-full text-xs font-bold py-3 bg-white text-[#064e3b] hover:bg-emerald-50">
                <FileText className="w-4 h-4 text-[#064e3b]" />
                <span>Create Research Report Now</span>
              </Button>
            </Link>
          </Card>
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
                <Button variant="primary" className="text-xs rounded-xl bg-[#064e3b]">
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
