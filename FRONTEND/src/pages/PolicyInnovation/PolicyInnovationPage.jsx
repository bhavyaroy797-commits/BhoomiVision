import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  Scale,
  Building2,
  FileText,
  Lightbulb,
  Users,
  RefreshCw,
  BarChart3,
  Sparkles,
  Search,
  MapPin,
  ShieldCheck,
  Download,
  Eye,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ExternalLink,
  Sliders,
  AlertCircle,
  HelpCircle,
  X,
  CheckCircle2,
  Layers,
  ArrowRight,
  Zap,
  TrendingUp,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LeafletMap from '../../components/map/LeafletMap';
import {
  POLICY_CATEGORIES,
  MOCK_POLICIES,
  MOCK_INNOVATIONS,
  MOCK_POLICY_EVIDENCE,
  getFilteredPolicies,
  getAIPolicyResponse,
} from '../../api/policyApi';

export const PolicyInnovationPage = () => {
  const { user } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('All States');
  const [savedPolicies, setSavedPolicies] = useState([]);

  // AI Guidance State
  const [aiActive, setAiActive] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Policy Modal Detail State
  const [activeModalPolicy, setActiveModalPolicy] = useState(null);

  // Comparison Matrix State
  const [comparePolicyA, setComparePolicyA] = useState(MOCK_POLICIES[0]);
  const [comparePolicyB, setComparePolicyB] = useState(MOCK_POLICIES[1]);

  // What-If Simulator State
  const [simUrbanGrowth, setSimUrbanGrowth] = useState(25);
  const [simAgriProtection, setSimAgriProtection] = useState(60);
  const [simInfraGrowth, setSimInfraGrowth] = useState(40);

  // Filtered policies list
  const filteredPolicies = getFilteredPolicies({
    category: selectedCategory,
    state: selectedState,
    searchKeyword: searchQuery,
  });

  const handleAskAI = (query = 'What are the impacts of land acquisition on rural agricultural communities?') => {
    setAiLoading(true);
    setAiActive(true);
    setTimeout(() => {
      const resp = getAIPolicyResponse(query);
      setAiResponse(resp);
      setAiLoading(false);
    }, 500);
  };

  const toggleSavePolicy = (id) => {
    if (savedPolicies.includes(id)) {
      setSavedPolicies(savedPolicies.filter((item) => item !== id));
    } else {
      setSavedPolicies([...savedPolicies, id]);
    }
  };

  return (
    <div className="space-y-8 text-left pb-12 font-sans">
      {/* 1. HEADER / BREADCRUMB WITH QUOTE CARD */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Link to="/dashboard/public" className="hover:underline">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 font-normal">Policy Innovation</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0d9488] p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
              <Scale className="w-3.5 h-3.5 text-emerald-300" />
              <span>Evidence-Based Policy Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Policy & Innovation
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Explore land policies, government schemes, and innovative solutions for sustainable and inclusive land governance.
            </p>
          </div>

          {/* Right Inspirational Quote Card */}
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-xs text-right hidden sm:block shrink-0">
            <p className="text-xs italic font-medium text-emerald-100 leading-snug">
              "Better policies today for a sustainable tomorrow."
            </p>
            <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-emerald-300 mt-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BHOOMIVISION Policy Lab</span>
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
              placeholder="Search policies, acts, schemes, regulations or land governance topics..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700"
            />
          </div>

          <Button
            onClick={() => handleAskAI(searchQuery || 'General Policy Guidance')}
            variant="primary"
            className="px-6 py-3 text-xs sm:text-sm font-semibold rounded-2xl shrink-0"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Search Policy Intelligence</span>
          </Button>
        </div>
      </Card>

      {/* 2. POLICY OVERVIEW DASHBOARD STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">Policies & Acts</p>
          <p className="text-2xl font-extrabold text-[#064e3b]">48+</p>
          <p className="text-[10px] text-emerald-700 font-medium">Indexed National & State Acts</p>
        </Card>

        <Card className="p-5 bg-white border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">Research-Backed Policies</p>
          <p className="text-2xl font-extrabold text-[#064e3b]">86%</p>
          <p className="text-[10px] text-emerald-700 font-medium">Grounded in Empirical Data</p>
        </Card>

        <Card className="p-5 bg-white border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">Policy Areas</p>
          <p className="text-2xl font-extrabold text-[#064e3b]">10</p>
          <p className="text-[10px] text-emerald-700 font-medium">Core Governance Sectors</p>
        </Card>

        <Card className="p-5 bg-white border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">States Covered</p>
          <p className="text-2xl font-extrabold text-[#064e3b]">28 States / UTs</p>
          <p className="text-[10px] text-emerald-700 font-medium">Pan-India Policy Scope</p>
        </Card>
      </div>

      {/* 3. EXPLORE POLICY AREAS (8 GRID CARDS - MATCHING IMAGE 4 MOCKUP) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-800" />
            <span>Explore Policy Areas</span>
          </h3>
          <span className="text-xs text-slate-500">Find relevant policies, schemes and innovations</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {POLICY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 group ${
                  isSelected
                    ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    <Scale className="w-5 h-5" />
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      isSelected ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <h4 className="font-bold text-sm leading-snug">{cat.name}</h4>
                  <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                    Central & state laws, schemes & reforms
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN WORKSPACE: LATEST POLICY DOCUMENTS & RIGHT AI GUIDANCE WIDGET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 2/3 COLUMN: LATEST POLICY DOCUMENTS LIST */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-800" />
              <span>Latest Policy Documents & Acts ({filteredPolicies.length})</span>
            </h3>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs text-emerald-800 font-semibold hover:underline"
              >
                Show All Categories
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredPolicies.map((policy) => {
              const isSaved = savedPolicies.includes(policy.id);
              return (
                <Card
                  key={policy.id}
                  className="hover:border-emerald-600 hover:shadow-md transition-all p-5 bg-white space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${policy.tagColor}`}>
                          {policy.tagType}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {policy.authority}
                        </span>
                        <span className="text-[11px] text-slate-400">• {policy.date}</span>
                      </div>

                      <h4 className="font-bold text-slate-800 text-base leading-snug">
                        {policy.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {policy.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSavePolicy(policy.id)}
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isSaved ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Unsave Policy' : 'Save Policy'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Policy Footer & Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Coverage: {policy.coverage}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => setActiveModalPolicy(policy)}
                        variant="primary"
                        size="sm"
                        className="text-xs font-semibold rounded-xl"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Policy Details</span>
                      </Button>

                      <Button
                        onClick={() => setActiveModalPolicy(policy)}
                        variant="outline"
                        size="sm"
                        className="text-xs font-semibold rounded-xl"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Analyze Impact</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* RIGHT 1/3 COLUMN: POLICY INSIGHTS & NEED POLICY GUIDANCE AI BOX */}
        <div className="lg:col-span-4 space-y-5">
          {/* Policy Insights Card */}
          <Card className="p-5 bg-emerald-50/60 border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-[#064e3b] font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Policy Insights</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Key empirical findings synthesized from national land policy audits:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Land use policies are increasingly focusing on sustainable and climate-resilient agricultural practices.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Many states are adopting digital land records (DILRMP) to reduce boundary disputes and increase transaction transparency.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Incentives for agroforestry and soil health restoration are growing rapidly across drought-prone districts.</span>
              </li>
            </ul>
          </Card>

          {/* Need Policy Guidance AI Widget Card (Matching Image 4 Mockup) */}
          <Card className="p-6 bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] text-white space-y-4 rounded-3xl border-none shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-emerald-300">
              <Lightbulb className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-base text-white">Need Policy Guidance?</h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Get AI-powered evidence recommendations tailored to your land research area or regional jurisdiction.
              </p>
            </div>

            <Button
              onClick={() => handleAskAI('Give me policy recommendations for agricultural land protection in West Bengal')}
              variant="primary"
              className="w-full text-xs font-bold py-2.5 bg-white text-[#064e3b] hover:bg-emerald-50 border-none shadow-md"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Ask AI Policy Assistant</span>
            </Button>
          </Card>
        </div>
      </div>

      {/* 5. AI POLICY ASSISTANT RESPONSE CARD (WHEN ACTIVE) */}
      {aiActive && (
        <Card className="bg-gradient-to-br from-emerald-950 via-[#064e3b] to-teal-950 text-white p-6 rounded-3xl space-y-5 border-none shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-700/50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/80 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">BHOOMIVISION Policy Intelligence</h3>
                <p className="text-[11px] text-emerald-200">Grounded Policy Impact & Recommendation Engine</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-600">
                Confidence: {aiResponse?.confidence || '94% (High)'}
              </span>
              <button onClick={() => setAiActive(false)} className="text-emerald-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {aiLoading ? (
            <div className="py-6 text-center text-emerald-200 text-xs">Evaluating statutory acts & evidence...</div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-emerald-300 font-semibold uppercase">Policy Query:</p>
              <p className="text-sm font-bold text-white italic">"{aiResponse?.query}"</p>
              <div className="p-4 bg-emerald-900/60 rounded-2xl border border-emerald-700/60 text-xs text-emerald-100 leading-relaxed">
                {aiResponse?.insight}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* 6. WHAT-IF POLICY SIMULATOR & INNOVATION ENGINE */}
      <Card className="p-6 bg-slate-900 text-white space-y-6 rounded-3xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 text-[11px] font-bold border border-emerald-700">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Policy Simulator</span>
            </div>
            <h3 className="text-lg font-bold text-white">What-If Policy Simulator & Impact Engine</h3>
            <p className="text-xs text-slate-400">
              Simulate how altering policy parameters influences agricultural land, dispute risks, and urban growth.
            </p>
          </div>

          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/80 shrink-0">
            ⚠️ Illustrative Simulation Model
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Urban Expansion Rate:</span>
              <span className="text-emerald-400 font-bold">{simUrbanGrowth}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simUrbanGrowth}
              onChange={(e) => setSimUrbanGrowth(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">Simulates peri-urban infrastructure encroachment</p>
          </div>

          <div className="space-y-2 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Agricultural Protection Mandate:</span>
              <span className="text-emerald-400 font-bold">{simAgriProtection}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simAgriProtection}
              onChange={(e) => setSimAgriProtection(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">Zoning strictness on prime arable land conversion</p>
          </div>

          <div className="space-y-2 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Infrastructure Corridor Growth:</span>
              <span className="text-emerald-400 font-bold">{simInfraGrowth}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simInfraGrowth}
              onChange={(e) => setSimInfraGrowth(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">Highways, industrial clusters & logistics hubs</p>
          </div>
        </div>

        {/* Projected Simulated Output Indicators */}
        <div className="p-5 bg-emerald-950/60 rounded-2xl border border-emerald-700/60 space-y-3">
          <h4 className="font-bold text-xs text-emerald-300 uppercase tracking-wider">Simulated Regional Impact Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-400">Agri Land Retention</p>
              <p className="text-xl font-bold text-emerald-400">
                {Math.max(20, 100 - Math.round(simUrbanGrowth * 0.7 - simAgriProtection * 0.5))}%
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-400">Dispute Vulnerability Risk</p>
              <p className="text-xl font-bold text-amber-400">
                {Math.min(95, Math.round(simUrbanGrowth * 0.8 + simInfraGrowth * 0.4 - simAgriProtection * 0.3))}%
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-400">Economic Value Add</p>
              <p className="text-xl font-bold text-sky-400">
                +{Math.round(simInfraGrowth * 0.9 + simUrbanGrowth * 0.5)}%
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-400">Environmental Stress Index</p>
              <p className="text-xl font-bold text-red-400">
                {Math.round(simUrbanGrowth * 0.6 + simInfraGrowth * 0.5 - simAgriProtection * 0.4)} / 100
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 7. POLICY + GIS ("POLICY IMPACT ON THE MAP") */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-800" />
            <span>Policy Impact on the Map</span>
          </h3>
          <p className="text-xs text-slate-500">
            Geospatial visualization connecting policy jurisdiction zones with real satellite land cover changes.
          </p>
        </div>

        <Card className="p-0 overflow-hidden border-slate-300 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8 h-80 relative">
              <LeafletMap center={[23.471, 88.556]} zoom={10} className="w-full h-full" />
            </div>

            <div className="lg:col-span-4 p-6 bg-slate-900 text-white space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded bg-emerald-800 text-emerald-200 text-[11px] font-bold">
                  Policy Area: Nadia Agricultural Protection Zone
                </span>
                <h4 className="font-bold text-base text-white">Spatial Statutory Overlay</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mapping statutory zoning restrictions under National Land Use Policy 2019 against satellite imagery.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <Link to="/gis-maps">
                  <Button variant="primary" className="w-full text-xs font-semibold py-2.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open GIS Policy Studio</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 8. INNOVATION & CASE STUDIES GRID (MATCHING IMAGE 4 MOCKUP) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-emerald-800" />
            <span>Innovation & Case Studies</span>
          </h3>
          <span className="text-xs text-slate-500">Explore real-world examples and innovative land governance solutions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_INNOVATIONS.map((inn) => (
            <Card key={inn.id} className="hover:border-emerald-600 hover:shadow-md transition-all p-5 space-y-3 bg-white flex flex-col justify-between">
              <div className="space-y-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${inn.badgeColor}`}>
                  {inn.category}
                </span>

                <h4 className="font-bold text-slate-800 text-sm leading-snug">
                  {inn.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {inn.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-emerald-800">Impact: {inn.impact}</span>
                <button className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-0.5">
                  <span>Read More</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 9. EVIDENCE BEHIND POLICY INSIGHTS */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>Evidence Behind Policy Insights</span>
          </h3>
          <p className="text-xs text-slate-500">
            Empirical data sources grounding BHOOMIVISION policy evaluation models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_POLICY_EVIDENCE.map((item) => (
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
                <span>Related: {item.relatedPolicy}</span>
                <button className="text-emerald-800 font-bold hover:underline">View Source →</button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* POLICY DETAIL MODAL */}
      {activeModalPolicy && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto text-left shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1 pr-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${activeModalPolicy.tagColor}`}>
                  {activeModalPolicy.tagType}
                </span>
                <h3 className="font-extrabold text-lg text-slate-800">{activeModalPolicy.title}</h3>
                <p className="text-xs text-slate-500">{activeModalPolicy.authority} • ({activeModalPolicy.date})</p>
              </div>
              <button onClick={() => setActiveModalPolicy(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Policy Objective</h4>
                <p className="leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {activeModalPolicy.objective}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Key Statutory Provisions</h4>
                <ul className="space-y-1.5 list-disc list-inside bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-200/70 text-emerald-950">
                  {activeModalPolicy.keyProvisions.map((prov, i) => (
                    <li key={i}>{prov}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Target Beneficiaries</h4>
                <p className="text-slate-600 font-semibold">{activeModalPolicy.targetBeneficiaries}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button onClick={() => setActiveModalPolicy(null)} variant="ghost" className="text-xs rounded-xl">
                Close
              </Button>
              <Link to="/gis-maps">
                <Button variant="primary" className="text-xs rounded-xl">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Spatial Coverage on Map</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyInnovationPage;
