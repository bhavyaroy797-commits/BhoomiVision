import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  MapPin,
  FileText,
  AlertTriangle,
  Building2,
  Scale,
  BarChart3,
  HelpCircle,
  Search,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Layers,
  Map,
  Compass,
  ArrowRight,
  CheckCircle2,
  X,
  PieChart,
  Calendar,
  Zap,
  Activity,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LeafletMap from '../../components/map/LeafletMap';
import {
  GOVERNANCE_STATS,
  MOCK_GOVERNANCE_FEATURES,
  MOCK_RECENT_UPDATES,
  MOCK_GOVERNANCE_RISKS,
  MOCK_GOVERNANCE_EVIDENCE,
  getAIGovernanceResponse,
} from '../../api/landGovernanceApi';

export const LandGovernancePage = () => {
  const { user } = useAuth();

  // Location selector state
  const [selectedState, setSelectedState] = useState('West Bengal');
  const [selectedDistrict, setSelectedDistrict] = useState('Nadia');
  const [selectedBlock, setSelectedBlock] = useState('Krishnanagar');
  const [selectedVillage, setSelectedVillage] = useState('Select Village (Optional)');

  // Timeline year state
  const [timelineYear, setTimelineYear] = useState(2025);

  // AI Assistant state
  const [aiActive, setAiActive] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Detail Modal state
  const [activeModalItem, setActiveModalItem] = useState(null);

  const statesList = ['West Bengal', 'Gujarat', 'Karnataka', 'Maharashtra', 'Punjab'];
  const districtsList = ['Nadia', 'Ahmedabad', 'Bengaluru Urban', 'Ahmednagar'];
  const blocksList = ['Krishnanagar', 'Ranaghat', 'Santipur', 'Chapra'];

  const handleAskAI = (query = `What are the major land governance risks in ${selectedDistrict}, ${selectedState}?`) => {
    setAiLoading(true);
    setAiActive(true);
    setTimeout(() => {
      const resp = getAIGovernanceResponse(query, `${selectedDistrict}, ${selectedState}`);
      setAiResponse(resp);
      setAiLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-8 text-left pb-12 font-sans">
      {/* 1. HEADER / BREADCRUMB WITH FLOATING QUOTE (MATCHING IMAGE 3 MOCKUP) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Link to="/dashboard/public" className="hover:underline">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 font-normal">Land Governance</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0f766e] p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>National Land Governance Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Land Governance
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Transparent land management, stronger policies, and accountable governance for a sustainable future.
            </p>
          </div>

          {/* Floating Quote Card (Matching Image 3 Mockup) */}
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-xs text-right hidden sm:block shrink-0">
            <p className="text-xs italic font-medium text-emerald-100 leading-snug">
              "Good governance turns land into opportunity for every citizen."
            </p>
            <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-emerald-300 mt-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BHOOMIVISION Governance</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP 4 METRIC STAT CARDS (EXACT MATCH FOR IMAGE 3 MOCKUP) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Land Area */}
        <Card className="p-5 bg-[#f0fdf4] border-emerald-200 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600">Total Land Area (India)</p>
            <p className="text-2xl font-extrabold text-[#064e3b] mt-0.5">{GOVERNANCE_STATS.totalLandArea}</p>
            <p className="text-[10px] text-emerald-800 font-semibold mt-0.5">{GOVERNANCE_STATS.totalLandAreaSub}</p>
          </div>
        </Card>

        {/* Card 2: Digitized Land Records */}
        <Card className="p-5 bg-sky-50/70 border-sky-200 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-700 text-white flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600">Digitized Land Records</p>
            <p className="text-2xl font-extrabold text-sky-950 mt-0.5">{GOVERNANCE_STATS.digitizedRecords}</p>
            <p className="text-[10px] text-sky-800 font-semibold mt-0.5">{GOVERNANCE_STATS.digitizedRecordsSub}</p>
          </div>
        </Card>

        {/* Card 3: Land Disputes */}
        <Card className="p-5 bg-red-50/70 border-red-200 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-700 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600">Land Disputes (2019–2024)</p>
            <p className="text-2xl font-extrabold text-red-950 mt-0.5">{GOVERNANCE_STATS.landDisputes}</p>
            <p className="text-[10px] text-red-800 font-semibold mt-0.5">{GOVERNANCE_STATS.landDisputesSub}</p>
          </div>
        </Card>

        {/* Card 4: Land Acquisition Projects */}
        <Card className="p-5 bg-purple-50/70 border-purple-200 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600">Land Acquisition Projects</p>
            <p className="text-2xl font-extrabold text-purple-950 mt-0.5">{GOVERNANCE_STATS.acquisitionProjects}</p>
            <p className="text-[10px] text-purple-800 font-semibold mt-0.5">{GOVERNANCE_STATS.acquisitionProjectsSub}</p>
          </div>
        </Card>
      </div>

      {/* 3. LAND GOVERNANCE OVERVIEW GRID (MAP + LOCATION SELECTOR - MATCHING IMAGE 3 MOCKUP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 2/3 COLUMN: MAP & LOCATION SELECTION */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-6 bg-white border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-800" />
                  <span>Land Governance Overview</span>
                </h3>
                <p className="text-xs text-slate-500">Explore land records, ownership patterns, disputes and governance status across India.</p>
              </div>
            </div>

            {/* Map & Location Selection Inner Split */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Map Preview Left */}
              <div className="md:col-span-7 h-72 relative rounded-2xl overflow-hidden border border-slate-200">
                <LeafletMap center={[23.471, 88.556]} zoom={9} className="w-full h-full" />
                {/* Map Legend Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md p-2.5 rounded-xl text-[10px] border border-slate-200 space-y-1 text-left shadow-sm">
                  <p className="font-bold text-slate-700">Governance Status</p>
                  <div className="space-y-0.5 font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Good</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Moderate</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Needs Attention</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical</span>
                  </div>
                </div>
              </div>

              {/* Location Select Form Right */}
              <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Select Location</h4>

                <div className="space-y-2 text-left">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                    >
                      {statesList.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">District</label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                    >
                      {districtsList.map((dst) => (
                        <option key={dst} value={dst}>{dst}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Block</label>
                    <select
                      value={selectedBlock}
                      onChange={(e) => setSelectedBlock(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                    >
                      {blocksList.map((blk) => (
                        <option key={blk} value={blk}>{blk}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Village / Area</label>
                    <select
                      value={selectedVillage}
                      onChange={(e) => setSelectedVillage(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                    >
                      <option value="Select Village (Optional)">Select Village (Optional)</option>
                      <option value="Krishnanagar North">Krishnanagar North</option>
                      <option value="Ranaghat East">Ranaghat East</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={() => handleAskAI()}
                  variant="primary"
                  className="w-full text-xs font-semibold py-2.5 rounded-xl mt-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>View Governance Details</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT 1/3 COLUMN: QUICK ACTIONS LIST (EXACT MATCH FOR IMAGE 3 MOCKUP) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 bg-white border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm border-b border-slate-100 pb-2">
              <Zap className="w-4 h-4 text-emerald-700" />
              <span>Quick Actions</span>
            </div>

            <div className="space-y-2">
              <Link to="/land-governance" className="block group">
                <div className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800 group-hover:text-emerald-900">View Land Records</p>
                      <p className="text-[10px] text-slate-500">Check ownership, mutation & records</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                </div>
              </Link>

              <Link to="/land-governance" className="block group">
                <div className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800 group-hover:text-emerald-900">Track Land Disputes</p>
                      <p className="text-[10px] text-slate-500">View case status and hotspots</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                </div>
              </Link>

              <Link to="/land-governance" className="block group">
                <div className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800 group-hover:text-emerald-900">Land Acquisition Status</p>
                      <p className="text-[10px] text-slate-500">Check ongoing and completed projects</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                </div>
              </Link>

              <Link to="/policy-innovation" className="block group">
                <div className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800 group-hover:text-emerald-900">Policy & Act Explorer</p>
                      <p className="text-[10px] text-slate-500">Browse relevant laws and policies</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                </div>
              </Link>

              <Link to="/reports" className="block group">
                <div className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800 group-hover:text-emerald-900">Governance Reports</p>
                      <p className="text-[10px] text-slate-500">Download state/district reports</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                </div>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* 4. KEY LAND GOVERNANCE FEATURES (6 GRID CARDS - EXACT MATCH FOR IMAGE 3 MOCKUP) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-800" />
            <span>Key Land Governance Features</span>
          </h3>
          <span className="text-xs text-slate-500 font-semibold">View All →</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_GOVERNANCE_FEATURES.map((feat) => (
            <Card
              key={feat.id}
              className="hover:border-emerald-600 hover:shadow-md transition-all p-5 space-y-3 bg-white"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${feat.bgColor} ${feat.iconColor} flex items-center justify-center shrink-0`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{feat.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{feat.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. RECENT UPDATES NEWS FEED (MATCHING IMAGE 3 MOCKUP) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-800" />
            <span>Recent Updates & Notifications</span>
          </h3>
          <span className="text-xs text-slate-500 font-semibold">View All →</span>
        </div>

        <Card className="p-0 bg-white border-slate-200 divide-y divide-slate-100">
          {MOCK_RECENT_UPDATES.map((upd) => (
            <div key={upd.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-md text-[10px] font-bold border ${upd.badgeColor}`}>
                  {upd.type}
                </span>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">{upd.title}</h4>
                  <p className="text-[11px] text-slate-500">{upd.department}</p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-slate-400 shrink-0">{upd.date}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* 6. LAND INTELLIGENCE GRAPH (MAJOR BHOOMIVISION USP) */}
      <Card className="p-6 bg-[#064e3b] text-white space-y-5 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-300 text-xs font-bold border border-emerald-600">
            <Zap className="w-3.5 h-3.5" />
            <span>Core Architectural USP</span>
          </div>
          <h3 className="text-lg font-extrabold text-white">BHOOMIVISION Land Intelligence Graph</h3>
          <p className="text-xs text-emerald-100 leading-relaxed max-w-3xl">
            Connecting multi-dimensional land insights across records, satellite imagery, academic research, statutory acts, and dispute mitigation pipelines.
          </p>
        </div>

        {/* Node Relationship Graph Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 items-center text-center text-xs font-bold">
          <div className="p-3 bg-emerald-900/80 rounded-2xl border border-emerald-700 text-emerald-200">
            1. LAND DATA
          </div>
          <div className="hidden lg:block text-emerald-400">→</div>

          <div className="p-3 bg-emerald-900/80 rounded-2xl border border-emerald-700 text-emerald-200">
            2. LAND USE / GIS
          </div>
          <div className="hidden lg:block text-emerald-400">→</div>

          <div className="p-3 bg-emerald-900/80 rounded-2xl border border-emerald-700 text-emerald-200">
            3. STATUTORY POLICY
          </div>
          <div className="hidden lg:block text-emerald-400">→</div>

          <div className="p-3 bg-emerald-900/80 rounded-2xl border border-emerald-700 text-emerald-200">
            4. DISPUTE MITIGATION
          </div>
        </div>
      </Card>

      {/* 7. EMERGING GOVERNANCE RISKS & ILLUSTRATIVE EARLY WARNING */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Emerging Governance Risks & Early Warning</span>
          </h3>
          <p className="text-xs text-slate-500">
            Automated spatial analytics highlighting regions facing development pressure or dispute vulnerability (*Illustrative Early Warning*).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_GOVERNANCE_RISKS.map((risk) => (
            <Card key={risk.id} className="p-5 bg-white border-amber-200/80 space-y-3 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${risk.badgeColor}`}>
                    {risk.riskLevel}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">{risk.location}</span>
                </div>

                <h4 className="font-bold text-slate-800 text-xs leading-snug">{risk.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{risk.reason}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                <p><strong>Evidence:</strong> {risk.evidence}</p>
                <p><strong>Policy Link:</strong> {risk.relatedPolicy}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 8. AI ASSISTANT RESPONSE CARD (WHEN ACTIVE) */}
      {aiActive && (
        <Card className="bg-gradient-to-br from-emerald-950 via-[#064e3b] to-teal-950 text-white p-6 rounded-3xl space-y-4 border-none shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-700/50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/80 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">BHOOMIVISION Governance Intelligence</h3>
                <p className="text-[11px] text-emerald-200">Location-based Governance Synthesizer</p>
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
            <div className="py-6 text-center text-emerald-200 text-xs">Analyzing location records & spatial vectors...</div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-emerald-300 font-semibold uppercase">Location Query:</p>
              <p className="text-sm font-bold text-white italic">"{aiResponse?.query}"</p>
              <div className="p-4 bg-emerald-900/60 rounded-2xl border border-emerald-700/60 text-xs text-emerald-100 leading-relaxed">
                {aiResponse?.insight}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* 9. PUBLIC ACTION / GRIEVANCE LINK */}
      <Card className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-base text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-300" />
              <span>Have a Land-Related Concern or Grievance?</span>
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed max-w-xl">
              Submit formal land record discrepancies, boundary dispute feedback, or track existing public grievance tickets.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/grievance">
              <Button variant="primary" className="text-xs font-bold py-2.5 px-5 bg-white text-[#064e3b] hover:bg-emerald-50 border-none shadow-md">
                <span>Report a Concern</span>
                <ArrowRight className="w-4 h-4 text-emerald-800" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 10. BOTTOM CTA BANNER (EXACT MATCH FOR IMAGE 3 MOCKUP) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-100 via-emerald-50 to-teal-100 p-8 border border-emerald-300/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#064e3b] flex items-center justify-center text-emerald-300 shrink-0 shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-left">
            <h3 className="text-lg font-extrabold text-[#064e3b]">
              Better Land Governance for a Sustainable India
            </h3>
            <p className="text-xs text-emerald-900/80 font-medium">
              Access data • Ensure transparency • Build a fairer future
            </p>
          </div>
        </div>

        <Link to="/gis-maps">
          <Button variant="primary" className="px-6 py-3 text-xs sm:text-sm font-bold rounded-2xl shrink-0 shadow-md">
            <span>Explore GIS & Maps</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandGovernancePage;
