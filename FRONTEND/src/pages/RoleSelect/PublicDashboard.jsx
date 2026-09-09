import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Map,
  FileText,
  Building2,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  Scale,
  MapPin,
  Compass,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calendar,
  Users,
  HelpCircle,
  Database,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Lock,
  Globe,
  Zap,
  Activity,
  Sliders,
  X,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LeafletMap from '../../components/map/LeafletMap';

export const PublicDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Search question state
  const [questionInput, setQuestionInput] = useState('');
  const [demoAiActive, setDemoAiActive] = useState(false);

  // Timeline year state
  const [timelineYear, setTimelineYear] = useState(2025);

  // Location selector state
  const [homeState, setHomeState] = useState('West Bengal');
  const [homeDistrict, setHomeDistrict] = useState('Nadia');

  const suggestedQuestions = [
    "How has agricultural land changed in Nadia over the last 10 years?",
    "Which areas are experiencing rapid urban expansion?",
    "What land-use risks are emerging in this region?",
    "How might a policy affect different regions?",
    "Where are major land governance challenges concentrated?",
  ];

  const handleAskQuestion = (q = questionInput) => {
    if (!q) return;
    setQuestionInput(q);
    setDemoAiActive(true);
  };

  return (
    <div className="space-y-12 text-left pb-16 font-sans">
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#047857] p-8 sm:p-12 text-white shadow-xl">
        {/* Background Subtle Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: `url('/FRONTEND/Public/assets/image/background.jpeg')` }} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-md border border-white/20">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>National Digital Platform for Land Governance</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                See the Land. <br />
                <span className="text-emerald-300">Understand the Change.</span> <br />
                Shape Better Decisions.
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                BHOOMIVISION connects land research, evidence, GIS intelligence, policy insights and governance data into one national intelligence platform.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/gis-maps">
                <Button variant="primary" className="px-6 py-3.5 text-sm font-extrabold rounded-2xl bg-emerald-400 text-emerald-950 hover:bg-emerald-300 border-none shadow-lg">
                  <span>Explore Land Intelligence</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link to="/research">
                <Button variant="outline" className="px-6 py-3.5 text-sm font-semibold rounded-2xl border-white/30 text-white hover:bg-white/10">
                  <Search className="w-4 h-4" />
                  <span>Start Research</span>
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="pt-4 border-t border-emerald-800/60 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
              <span className="text-emerald-400">Quick Modules:</span>
              <Link to="/research" className="hover:text-white transition-colors">Research →</Link>
              <Link to="/policy-innovation" className="hover:text-white transition-colors">Policy Innovation →</Link>
              <Link to="/land-governance" className="hover:text-white transition-colors">Land Governance →</Link>
              <Link to="/gis-maps" className="hover:text-white transition-colors">GIS Maps →</Link>
            </div>
          </div>

          {/* Right GIS Studio Preview Box */}
          <div className="lg:col-span-5 h-80 relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl">
            <LeafletMap center={[23.471, 88.556]} zoom={9} className="w-full h-full" />
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-xl border border-slate-700 font-bold">
              🌐 Live Spatial Canvas • Nadia District Overlay
            </div>
          </div>
        </div>
      </div>

      {/* 2. SIGNATURE CONCEPT: "WHERE + WHAT + WHEN + WHY" */}
      <Card className="p-8 bg-white border-emerald-900/15 rounded-3xl shadow-sm space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase">
            <Zap className="w-3.5 h-3.5 text-emerald-700" />
            <span>Signature Intelligence Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            From Land Data to Land Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            BHOOMIVISION doesn't just show isolated land records — it connects spatial location, temporal change, empirical data, and statutory policy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-left">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-xs">
              WHERE
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Spatial GIS Map</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              GIS maps show precisely where land cover changes and boundary events occur geographically.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2 text-left">
            <div className="w-8 h-8 rounded-xl bg-sky-700 text-white flex items-center justify-center font-extrabold text-xs">
              WHAT
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Land Records & Data</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Land records and satellite data reveal what specific land-use transitions are taking place.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2 text-left">
            <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-extrabold text-xs">
              WHEN
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Temporal Change</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multi-temporal satellite audits track when agricultural land shifts over 5 to 15 years.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-left">
            <div className="w-8 h-8 rounded-xl bg-amber-700 text-white flex items-center justify-center font-extrabold text-xs">
              WHY
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Research & Policy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Academic research and statutory policies explain why governance risks and urban sprawl emerge.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. "WHY BHOOMIVISION?" SECTION (PROBLEM -> SOLUTION) */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Land Data Exists. Connected Land Intelligence Doesn't.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Land information is currently fragmented across isolated databases. BHOOMIVISION unites them into one evidence-grounded intelligence layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-white border-slate-200 space-y-3 hover:border-emerald-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Land Research</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              1,480+ indexed academic papers and studies providing empirical evidence on land-use transformations.
            </p>
          </Card>

          <Card className="p-6 bg-white border-slate-200 space-y-3 hover:border-emerald-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">GIS & Remote Sensing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-resolution satellite overlays, ISRO Bhuvan integration, and cadastral plot boundary vector maps.
            </p>
          </Card>

          <Card className="p-6 bg-white border-slate-200 space-y-3 hover:border-emerald-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Policy & Governance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Statutory acts, land reforms, dispute litigation tracking, and interactive scenario simulation models.
            </p>
          </Card>
        </div>
      </div>

      {/* 4. PLATFORM INTELLIGENCE FLOW */}
      <Card className="p-8 bg-[#064e3b] text-white rounded-3xl space-y-6 shadow-xl">
        <div className="space-y-1 text-center max-w-xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-300 text-xs font-bold">
            Interconnected Workflow
          </span>
          <h2 className="text-2xl font-extrabold text-white">
            How BHOOMIVISION Connects the Ecosystem
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center text-xs font-bold">
          <Link to="/research" className="p-3.5 bg-emerald-900/80 hover:bg-emerald-700 rounded-2xl border border-emerald-700 text-emerald-100 transition-colors">
            1. RESEARCH
          </Link>
          <div className="hidden lg:flex items-center justify-center text-emerald-400 font-bold">→</div>

          <Link to="/research" className="p-3.5 bg-emerald-900/80 hover:bg-emerald-700 rounded-2xl border border-emerald-700 text-emerald-100 transition-colors">
            2. EVIDENCE
          </Link>
          <div className="hidden lg:flex items-center justify-center text-emerald-400 font-bold">→</div>

          <Link to="/gis-maps" className="p-3.5 bg-emerald-900/80 hover:bg-emerald-700 rounded-2xl border border-emerald-700 text-emerald-100 transition-colors">
            3. GIS DATA
          </Link>
          <div className="hidden lg:flex items-center justify-center text-emerald-400 font-bold">→</div>

          <Link to="/policy-innovation" className="p-3.5 bg-emerald-900/80 hover:bg-emerald-700 rounded-2xl border border-emerald-700 text-emerald-100 transition-colors">
            4. POLICY
          </Link>
        </div>
      </Card>

      {/* 5. EXPLORE BHOOMIVISION (4 MAJOR MODULE CARDS) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-800">Explore Land Intelligence</h2>
            <p className="text-xs text-slate-500">Four core modules providing multi-dimensional insights</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Research */}
          <Card className="p-6 bg-white border-slate-200 hover:border-emerald-600 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">1. Land Research</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover academic papers, research gap detectors, and AI-synthesized evidence on land governance.
              </p>
            </div>
            <Link to="/research">
              <Button variant="primary" className="w-full text-xs font-semibold py-2.5 rounded-xl">
                <span>Explore Research</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>

          {/* Card 2: Policy Innovation */}
          <Card className="p-6 bg-white border-slate-200 hover:border-emerald-600 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">2. Policy Innovation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Understand land laws, statutory acts, and scenario impact simulators for better land governance.
              </p>
            </div>
            <Link to="/policy-innovation">
              <Button variant="primary" className="w-full text-xs font-semibold py-2.5 rounded-xl">
                <span>Explore Policy Innovation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>

          {/* Card 3: Land Governance */}
          <Card className="p-6 bg-white border-slate-200 hover:border-emerald-600 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">3. Land Governance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identify land-use trends, dispute litigation risks, and emerging governance pressure points.
              </p>
            </div>
            <Link to="/land-governance">
              <Button variant="primary" className="w-full text-xs font-semibold py-2.5 rounded-xl">
                <span>Explore Land Governance</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>

          {/* Card 4: GIS Maps */}
          <Card className="p-6 bg-white border-slate-200 hover:border-emerald-600 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">4. GIS & Maps Studio</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visualize land, multi-temporal changes, risk overlays, and satellite imagery geographically.
              </p>
            </div>
            <Link to="/gis-maps">
              <Button variant="primary" className="w-full text-xs font-semibold py-2.5 rounded-xl">
                <span>Open GIS Intelligence</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* 6. ASK A LAND QUESTION SECTION */}
      <Card className="p-6 sm:p-8 bg-white border-emerald-900/15 rounded-3xl space-y-5 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Interactive AI Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Ask a Question About Land</h2>
          <p className="text-xs text-slate-500">
            Turn a land-related question into evidence, analysis and visual intelligence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="What would you like to understand about land?"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
            />
          </div>

          <Button
            onClick={() => handleAskQuestion()}
            variant="primary"
            className="px-6 py-3 text-xs sm:text-sm font-semibold rounded-2xl shrink-0"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Explore Intelligence</span>
          </Button>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-slate-600 uppercase">Suggested Prompts:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAskQuestion(q)}
                className="text-xs bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 px-3 py-1.5 rounded-xl transition-colors text-left"
              >
                💡 {q}
              </button>
            ))}
          </div>
        </div>

        {demoAiActive && (
          <div className="p-4 bg-emerald-950 text-white rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Illustrative AI Intelligence Response
              </span>
              <button onClick={() => setDemoAiActive(false)} className="text-emerald-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-emerald-100">
              Query: <strong>"{questionInput}"</strong>
            </p>
            <p className="text-slate-300 leading-relaxed">
              Spatial satellite analysis and DILRMP record audits indicate shifting land-use patterns driven by highway infrastructure corridor growth and peri-urban expansion.
            </p>
          </div>
        )}
      </Card>

      {/* 7. LAND CHANGE VISUALIZATION TIMELINE */}
      <Card className="p-6 bg-white border-slate-200 space-y-4 rounded-3xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-800" />
            <span>Understand How Land Changes Over Time</span>
          </h2>
          <p className="text-xs text-slate-500">
            Multi-temporal satellite monitoring connecting Time + Location + Land Use + Evidence (*Illustrative Timeline*).
          </p>
        </div>

        <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl overflow-x-auto">
          {[2010, 2015, 2020, 2025].map((yr) => (
            <button
              key={yr}
              onClick={() => setTimelineYear(yr)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                timelineYear === yr ? 'bg-[#064e3b] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Year {yr}
            </button>
          ))}
        </div>

        <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2 text-xs">
          <h4 className="font-bold text-slate-800 text-sm">
            {timelineYear === 2025 && '2025: High-Res Drone Orthomosaic Sync & Conclusive Titling Pilot'}
            {timelineYear === 2020 && '2020: Sentinel-2 Multi-Spectral Baseline Audit'}
            {timelineYear === 2015 && '2015: Landsat LULC Time-Series Survey Baseline'}
            {timelineYear === 2010 && '2010: Initial Manual Paper Record Digitization Baseline'}
          </h4>
          <p className="text-slate-600 leading-relaxed">
            {timelineYear === 2025 && 'Detected 18.2% expansion in built-up area along transit corridors with 12.4% reduction in cropland.'}
            {timelineYear === 2020 && 'Established 10m multi-spectral satellite baseline for agricultural land conversion.'}
            {timelineYear === 2015 && 'Observed early suburban sprawl near railway junctions.'}
            {timelineYear === 2010 && 'Dominant agricultural land use with minimal non-farm encroachment.'}
          </p>
        </div>
      </Card>

      {/* 8. FOR EVERY TYPE OF USER */}
      <div className="space-y-4">
        <div className="space-y-1 text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-800">Built for Different Land Intelligence Needs</h2>
          <p className="text-xs text-slate-500">Serving citizens, researchers, GIS officers, policymakers, and system admins</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-4 bg-[#064e3b] text-white rounded-2xl space-y-2 text-left shadow-md">
            <span className="px-2 py-0.5 rounded bg-emerald-700 text-emerald-200 text-[10px] font-bold">Active Role</span>
            <h4 className="font-bold text-sm">Public User</h4>
            <p className="text-[11px] text-emerald-100 leading-snug">Discover general land information, research, policies, and maps.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 text-left">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">Role</span>
            <h4 className="font-bold text-sm text-slate-800">Researcher</h4>
            <p className="text-[11px] text-slate-500 leading-snug">Explore empirical datasets, papers and research gaps.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 text-left">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">Role</span>
            <h4 className="font-bold text-sm text-slate-800">GIS Officer</h4>
            <p className="text-[11px] text-slate-500 leading-snug">Analyze spatial layers and field reporting tools.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 text-left">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">Role</span>
            <h4 className="font-bold text-sm text-slate-800">Govt Officer</h4>
            <p className="text-[11px] text-slate-500 leading-snug">Understand policy impact and governance signals.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 text-left">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">Role</span>
            <h4 className="font-bold text-sm text-slate-800">System Admin</h4>
            <p className="text-[11px] text-slate-500 leading-snug">Manage platform settings and user permissions.</p>
          </div>
        </div>
      </div>

      {/* 9. PUBLIC GRIEVANCE & REPORTS PREVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-slate-200 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
              <FileText className="w-4 h-4 text-purple-700" />
              <span>Turn Intelligence Into Reports</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synthesize location-specific land intelligence reports combining GIS, research, policy, and governance findings.
            </p>
          </div>
          <Link to="/reports">
            <Button variant="outline" className="w-full text-xs font-semibold py-2.5 rounded-xl">
              <span>Explore Reports Center →</span>
            </Button>
          </Link>
        </Card>

        <Card className="p-6 bg-white border-slate-200 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-red-700" />
              <span>See a Land-Related Issue?</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit formal land record discrepancies or track public grievance tickets transparently.
            </p>
          </div>
          <Link to="/grievance">
            <Button variant="outline" className="w-full text-xs font-semibold py-2.5 rounded-xl border-red-200 text-red-700 hover:bg-red-50">
              <span>Report / Explore Grievances →</span>
            </Button>
          </Link>
        </Card>
      </div>

      {/* 10. FINAL CALL TO ACTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#047857] p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Understand Land. Discover Evidence. Enable Better Decisions.
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Join India's national land intelligence platform connecting research, policy, GIS, and governance.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/gis-maps">
            <Button variant="primary" className="px-6 py-3.5 text-xs sm:text-sm font-bold rounded-2xl bg-emerald-400 text-emerald-950 hover:bg-emerald-300 border-none shadow-lg">
              <span>Explore BHOOMIVISION</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link to="/research">
            <Button variant="outline" className="px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-2xl border-white/30 text-white hover:bg-white/10">
              <span>Start Research</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicDashboard;
