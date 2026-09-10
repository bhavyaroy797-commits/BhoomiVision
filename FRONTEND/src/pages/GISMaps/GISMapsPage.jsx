import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  Map,
  Layers,
  Globe,
  BarChart3,
  Download,
  Search,
  Maximize2,
  MapPin,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Compass,
  Zap,
  X,
  Database,
  Sliders,
  AlertTriangle,
  FileCheck,
  Ruler,
  TrendingUp,
  FileText,
  Activity,
  Navigation,
  Crosshair,
  ExternalLink,
  BookOpen,
  Scale,
  Send,
  Check,
  Info,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LeafletMap from '../../components/map/LeafletMap';
import LayerControlPanel from '../../components/map/LayerControlPanel';
import MapLegend from '../../components/map/MapLegend';
import BhuvanLayer from '../../components/map/BhuvanLayer';
import {
  GIS_FEATURE_TABS,
  MOCK_LOCATION_DATA,
  MOCK_LULC_STATS,
  MOCK_RECENT_MAPS,
  MOCK_FEATURED_DATASETS,
  MOCK_DETECTED_CHANGES,
  MOCK_FIELD_VERIFICATION_QUEUE,
  MOCK_SPATIAL_RISK_MODELS,
  MOCK_SATELLITE_INTELLIGENCE,
  MOCK_SAVED_AREAS,
  MOCK_GIS_TOOLS,
  getAIGISResponse,
} from '../../api/gisApi';

export const GISMapsPage = () => {
  const { user } = useAuth();

  // Active Tab State
  const [activeTab, setActiveTab] = useState('map');

  // Layer & Base Map state
  const [activeLayers, setActiveLayers] = useState([
    'India Boundary',
    'State Boundary',
    'Agricultural Land',
    'Built-up Area',
    'Water Bodies',
  ]);
  const [activeBaseMap, setActiveBaseMap] = useState('OpenStreetMap');

  // Location Hierarchy State
  const [selectedState, setSelectedState] = useState('West Bengal');
  const [selectedDistrict, setSelectedDistrict] = useState('North 24 Parganas');
  const [selectedBlock, setSelectedBlock] = useState('Barasat');

  // Timeline year state
  const [timelineYear, setTimelineYear] = useState(2026);

  // AI Assistant state ("Ask the Map")
  const [mapQuery, setMapQuery] = useState('');
  const [aiActive, setAiActive] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Field Verification state
  const [verifications, setVerifications] = useState(MOCK_FIELD_VERIFICATION_QUEUE);

  // Field Observation Form state
  const [obsLocation, setObsLocation] = useState('Barasat Sub-division');
  const [obsType, setObsType] = useState('Built-up Expansion');
  const [obsDesc, setObsDesc] = useState('');
  const [obsPriority, setObsPriority] = useState('High');
  const [obsSuccessMsg, setObsSuccessMsg] = useState('');

  // Saved map views
  const [savedAreas, setSavedAreas] = useState(['North 24 Parganas District']);

  // GIS Demo Report Generator state
  const [reportLocation, setReportLocation] = useState('Barasat, North 24 Parganas');
  const [reportTimeframe, setReportTimeframe] = useState('2024–2026');
  const [reportCategory, setReportCategory] = useState('Agricultural Land');
  const [reportChangeType, setReportChangeType] = useState('Built-up Expansion');
  const [reportRiskLayer, setReportRiskLayer] = useState('Development Pressure');
  const [reportGenerated, setReportGenerated] = useState(false);

  // Helper getters for dynamic location data
  const stateData = MOCK_LOCATION_DATA[selectedState] || MOCK_LOCATION_DATA['West Bengal'];
  const availableDistricts = Object.keys(stateData || {});
  const currentDistrictObj = stateData[selectedDistrict] || Object.values(stateData)[0];
  const availableBlocks = Object.keys(currentDistrictObj?.blocks || {});
  const currentBlockData = currentDistrictObj?.blocks?.[selectedBlock] || Object.values(currentDistrictObj?.blocks || {})[0];
  const currentCenter = currentBlockData?.coordinates || currentDistrictObj?.center || [22.7214, 88.4816];

  const handleStateChange = (st) => {
    setSelectedState(st);
    const firstDist = Object.keys(MOCK_LOCATION_DATA[st] || {})[0];
    if (firstDist) {
      setSelectedDistrict(firstDist);
      const firstBlk = Object.keys(MOCK_LOCATION_DATA[st][firstDist]?.blocks || {})[0];
      if (firstBlk) setSelectedBlock(firstBlk);
    }
  };

  const handleDistrictChange = (dt) => {
    setSelectedDistrict(dt);
    const firstBlk = Object.keys(stateData[dt]?.blocks || {})[0];
    if (firstBlk) setSelectedBlock(firstBlk);
  };

  const toggleLayer = (layerName) => {
    if (activeLayers.includes(layerName)) {
      setActiveLayers(activeLayers.filter((l) => l !== layerName));
    } else {
      setActiveLayers([...activeLayers, layerName]);
    }
  };

  const handleAskMap = (q = mapQuery) => {
    if (!q) return;
    setAiLoading(true);
    setAiActive(true);
    setTimeout(() => {
      const resp = getAIGISResponse(q, `${selectedBlock}, ${selectedDistrict}`);
      setAiResponse(resp);
      setAiLoading(false);
    }, 400);
  };

  const toggleSaveArea = (name) => {
    if (savedAreas.includes(name)) {
      setSavedAreas(savedAreas.filter((a) => a !== name));
    } else {
      setSavedAreas([...savedAreas, name]);
    }
  };

  const markVerified = (id) => {
    setVerifications(
      verifications.map((item) => (item.id === id ? { ...item, status: 'Verified' } : item))
    );
  };

  const handleAddObservation = (e) => {
    e.preventDefault();
    if (!obsDesc.trim()) return;

    const newObs = {
      id: `fv_${Date.now()}`,
      area: obsLocation,
      district: selectedDistrict,
      reason: `${obsType}: ${obsDesc}`,
      priority: `${obsPriority} Priority`,
      status: 'Pending Verification',
      lastObserved: 'Just now',
      coordinates: `${currentCenter[0]}° N, ${currentCenter[1]}° E`,
    };

    setVerifications([newObs, ...verifications]);
    setObsSuccessMsg('Demo Field Observation added to queue successfully!');
    setObsDesc('');
    setTimeout(() => setObsSuccessMsg(''), 4000);
  };

  const handleGenerateReport = () => {
    setReportGenerated(true);
  };

  return (
    <div className="space-y-6 text-left pb-12 font-sans bg-slate-50/40 p-2 sm:p-4 rounded-3xl">
      {/* DEMO MODE INDICATOR BANNER (SECTION 24) */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-amber-900 font-semibold shadow-sm">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider shrink-0">
            DEMO MODE
          </span>
          <p className="text-amber-950 font-medium">
            Live database and backend services are not connected. Showing illustrative GIS data.
          </p>
        </div>
        <span className="text-[10px] text-amber-800 font-bold underline cursor-pointer shrink-0">
          Vercel Frontend Preview • Prototype Ready
        </span>
      </div>

      {/* 1. COMPACT GIS WORKSPACE HEADER */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 border-b border-slate-200/80 pb-2">
          <div className="flex items-center gap-2">
            <Link to="/dashboard/public" className="hover:underline">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-emerald-950 font-bold">GIS INTELLIGENCE WORKSPACE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#064e3b] bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              GIS FIELD OFFICER / EXPERT PORTAL
            </span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              Demo Data
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-[#064e3b] p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
              <Globe className="w-3.5 h-3.5 text-emerald-300" />
              <span>National Spatial Monitoring Room</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              GIS Operational Intelligence Workspace
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Monitor land-use change, analyze spatial patterns, and identify geographic risk hotspots across India's cadastral and satellite datasets.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 z-10">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <p className="text-[10px] text-emerald-200 uppercase font-semibold">Active Spatial Location</p>
              <p className="text-xs font-bold text-white">{selectedBlock}, {selectedDistrict}</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <p className="text-[10px] text-emerald-200 uppercase font-semibold">Satellite Feed Status</p>
              <p className="text-xs font-bold text-emerald-300">Sentinel-2 (Demo Sync)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GIS OPERATIONAL ROLE NAVIGATION / FEATURE TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {GIS_FEATURE_TABS.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 group ${
                isSelected
                  ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-md'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs leading-snug">{tab.title}</h4>
                <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                  {tab.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. GIS WORKSPACE QUICK TOOLS BAR */}
      <Card className="p-3 bg-white border-slate-200">
        <div className="flex items-center justify-between overflow-x-auto gap-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase shrink-0 flex items-center gap-1.5 px-2">
            <Ruler className="w-3.5 h-3.5 text-emerald-800" />
            <span>GIS Tools:</span>
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {MOCK_GIS_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleAskMap(`Execute tool: ${tool.name}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-100/70 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>{tool.name}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 4. PRIMARY MAP WORKSPACE (SECTION 10 & 11 - OPENSTREETMAP + LEAFLET) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: MAP LAYERS CONTROL PANEL (3 COLS) */}
        <div className="lg:col-span-3 space-y-4">
          <LayerControlPanel
            activeLayers={activeLayers}
            onToggleLayer={toggleLayer}
            activeBaseMap={activeBaseMap}
            onSelectBaseMap={setActiveBaseMap}
          />
        </div>

        {/* CENTER COLUMN: MAIN INTERACTIVE MAP (6 COLS) */}
        <div className="lg:col-span-6 space-y-3">
          <Card className="p-0 overflow-hidden border-slate-300 shadow-lg relative rounded-3xl">
            {/* Top Search & Controls Bar inside Map */}
            <div className="p-3 bg-white/95 backdrop-blur-md border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={mapQuery}
                  onChange={(e) => setMapQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskMap()}
                  placeholder="Search location (State, District, Block, Cadastral Plot ID...)"
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  onClick={() => handleAskMap()}
                  variant="primary"
                  size="sm"
                  className="text-xs font-bold rounded-xl py-1.5 bg-[#064e3b]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </Button>
                <button
                  type="button"
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs flex items-center gap-1 font-semibold"
                  title="Full Screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Leaflet Map Canvas */}
            <div className="h-[480px] relative">
              <LeafletMap center={currentCenter} zoom={11} className="w-full h-full" />

              {/* Bhuvan Layer Badge Overlay */}
              <div className="absolute top-3 left-3 z-10">
                <BhuvanLayer />
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-3 left-3 z-10">
                <MapLegend activeLayers={activeLayers} />
              </div>

              {/* Base Map Indicator Badge */}
              <div className="absolute top-3 right-3 z-10 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-xl border border-slate-700">
                Base Map: {activeBaseMap === 'Satellite Imagery' ? 'Satellite (Demo Layer)' : 'OpenStreetMap'}
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: LOCATION INTELLIGENCE & AREA PANEL (3 COLS) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Location Hierarchy Selector */}
          <Card className="p-4 bg-white border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs border-b border-slate-100 pb-2">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Location Intelligence Hierarchy</span>
            </div>

            <div className="space-y-2 text-left">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">State</label>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  {Object.keys(MOCK_LOCATION_DATA).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  {availableDistricts.map((dt) => (
                    <option key={dt} value={dt}>{dt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Sub-District / Block</label>
                <select
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  {availableBlocks.map((blk) => (
                    <option key={blk} value={blk}>{blk}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              onClick={() => handleAskMap(`Run spatial analysis for ${selectedBlock}, ${selectedDistrict}`)}
              variant="primary"
              className="w-full text-xs font-bold py-2.5 rounded-xl bg-[#064e3b]"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Analyse Selected Area</span>
            </Button>
          </Card>

          {/* DUMMY LAND-USE DATA CARD (SECTION 4) */}
          <Card className="p-4 bg-slate-50 border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>Land-Use Distribution</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Illustrative Data
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-700 font-bold border-b border-slate-200 pb-1">
                <span>Category</span>
                <span>Previous → Current</span>
              </div>
              {(currentBlockData?.lulc || MOCK_LULC_STATS.categories).map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </span>
                    <span className="font-bold text-slate-900">
                      {item.prevPercent ? `${item.prevPercent}% → ` : ''}{item.percent}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 5. LAND CHANGE DETECTION & TEMPORAL COMPARISON (SECTION 5 & 9) */}
      <Card className="p-6 bg-white border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-800" />
              <span>Land Change Detection (2024 → 2026)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Simulated multi-spectral satellite change detection matrix for selected spatial region.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Illustrative Change Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          {(currentBlockData?.changeDetection || [
            { type: 'Built-up Expansion', change: '+6.2%', priority: 'High', area: '19.3 km²' },
            { type: 'Agricultural Conversion', change: '-5.8%', priority: 'Medium', area: '18.0 km²' },
            { type: 'Vegetation Change', change: '-1.2%', priority: 'Low', area: '3.7 km²' },
            { type: 'Water-body Change', change: '-1.4%', priority: 'Medium', area: '4.3 km²' },
            { type: 'Road / Infra Expansion', change: '+2.2%', priority: 'High', area: '6.8 km²' },
          ]).map((cd, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-left">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                cd.priority === 'High' ? 'bg-red-100 text-red-900' : 'bg-amber-100 text-amber-900'
              }`}>
                {cd.priority} Priority
              </span>
              <p className="font-bold text-slate-800 mt-1">{cd.type}</p>
              <p className="text-base font-extrabold text-emerald-950">{cd.change}</p>
              <p className="text-[11px] text-slate-500">Area: {cd.area}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 6. SPATIAL RISK & HOTSPOT INTELLIGENCE (SECTION 6) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-700" />
            <span>Spatial Risk & Hotspot Intelligence</span>
          </h3>
          <span className="text-[10px] font-bold text-red-900 bg-red-100 px-2.5 py-0.5 rounded border border-red-300">
            Illustrative Risk Model
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_SPATIAL_RISK_MODELS.map((risk) => (
            <Card key={risk.id} className="bg-white border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${risk.color}`}>
                  {risk.level}
                </span>
                <span className="text-[10px] font-bold text-slate-400">{risk.modelLabel}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">{risk.category}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{risk.summary}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Location: {risk.location}</span>
                <button
                  onClick={() => handleAskMap(`Focus risk hotspot on map: ${risk.location}`)}
                  className="text-emerald-800 font-bold hover:underline"
                >
                  View on Map →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 7. FIELD VERIFICATION QUEUE & OBSERVATION FORM (SECTION 7 & 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FIELD VERIFICATION QUEUE (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 bg-white border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-800" />
                  <span>Field Verification Queue</span>
                </h3>
                <p className="text-xs text-slate-500">Areas flagged for on-ground GIS field officer verification</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Demo Queue
              </span>
            </div>

            <div className="space-y-3">
              {verifications.map((item) => (
                <div key={item.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{item.area} ({item.district})</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Verified' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-slate-600"><strong>Reason:</strong> {item.reason}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px] text-slate-500">
                    <span>GPS: {item.coordinates}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAskMap(`Locate field verification on map: ${item.area}`)}
                        className="text-slate-700 hover:text-emerald-800 font-semibold"
                      >
                        View on Map
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        onClick={() => markVerified(item.id)}
                        className="text-emerald-800 font-bold hover:underline"
                      >
                        {item.status === 'Verified' ? 'Verified ✓' : 'Mark Verified'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* DEMO FIELD OBSERVATION FORM & SATELLITE INTELLIGENCE (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          {/* FIELD OBSERVATION FORM (SECTION 8) */}
          <Card className="p-5 bg-white border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-800" />
                <span>Add Field Observation</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Demo Form
              </span>
            </div>

            {obsSuccessMsg && (
              <div className="p-2.5 bg-emerald-50 text-emerald-900 text-xs rounded-xl border border-emerald-200 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{obsSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddObservation} className="space-y-2.5 text-xs text-left">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Location</label>
                <input
                  type="text"
                  value={obsLocation}
                  onChange={(e) => setObsLocation(e.target.value)}
                  placeholder="e.g. Barasat Sub-division"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Observation Type</label>
                <select
                  value={obsType}
                  onChange={(e) => setObsType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-semibold"
                >
                  <option value="Land-use Change">Land-use Change</option>
                  <option value="Unauthorized Development">Unauthorized Development</option>
                  <option value="Water-body Change">Water-body Change</option>
                  <option value="Agricultural Conversion">Agricultural Conversion</option>
                  <option value="Infrastructure Expansion">Infrastructure Expansion</option>
                  <option value="Environmental Concern">Environmental Concern</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Description</label>
                <textarea
                  value={obsDesc}
                  onChange={(e) => setObsDesc(e.target.value)}
                  placeholder="Describe ground observations..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Priority Level</label>
                <select
                  value={obsPriority}
                  onChange={(e) => setObsPriority(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-semibold"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full text-xs font-bold py-2.5 rounded-xl bg-[#064e3b]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Demo Observation</span>
              </Button>
            </form>
          </Card>

          {/* SATELLITE INTELLIGENCE METADATA (SECTION 9) */}
          <Card className="p-5 bg-white border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-800" />
                <span>Satellite Intelligence Metadata</span>
              </h3>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <p><strong>Provider:</strong> {MOCK_SATELLITE_INTELLIGENCE.provider}</p>
              <p><strong>Last Pass Date:</strong> {MOCK_SATELLITE_INTELLIGENCE.lastPassDate}</p>
              <p><strong>Cloud Inundation:</strong> {MOCK_SATELLITE_INTELLIGENCE.cloudCover}</p>
              <p><strong>Resolution:</strong> {MOCK_SATELLITE_INTELLIGENCE.resolution}</p>
              <p><strong>Bands:</strong> {MOCK_SATELLITE_INTELLIGENCE.activeSensors.join(', ')}</p>
              <p><strong>Data Status:</strong> <span className="font-bold text-emerald-800">{MOCK_SATELLITE_INTELLIGENCE.dataStatus}</span></p>
            </div>
          </Card>
        </div>
      </div>

      {/* 8. ASK THE MAP - 10 PREDEFINED QUESTIONS (SECTION 14) */}
      <Card className="p-5 bg-white border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-800" />
              <span>Ask the Map (GIS Spatial Assistant)</span>
            </h3>
            <p className="text-xs text-slate-500">Ask spatial intelligence questions regarding change detection, land-use pressure, or hotspot risks.</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Demo AI Assistant
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={mapQuery}
            onChange={(e) => setMapQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskMap()}
            placeholder="e.g. What areas show high built-up expansion?"
            className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl text-xs p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
          />
          <Button
            onClick={() => handleAskMap()}
            variant="primary"
            className="text-xs font-bold py-3 px-5 rounded-2xl bg-[#064e3b]"
          >
            <span>Ask Map</span>
          </Button>
        </div>

        {/* 10 Predefined Demo GIS Questions */}
        <div className="space-y-1.5">
          <span className="text-slate-500 font-bold text-[11px]">Predefined GIS Spatial Queries:</span>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              'What areas show high built-up expansion?',
              'Where is agricultural land conversion highest?',
              'Show land-use changes between 2024 and 2026.',
              'Which areas need field verification?',
              'Which locations have high development pressure?',
              'Compare agriculture and built-up land.',
              'Show water-body changes.',
              'What changed around major roads?',
              'Which areas should be investigated further?',
              'Show the highest-risk areas on the map.',
            ].map((sq, i) => (
              <button
                key={i}
                onClick={() => {
                  setMapQuery(sq);
                  handleAskMap(sq);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-semibold transition-colors"
              >
                💡 {sq}
              </button>
            ))}
          </div>
        </div>

        {aiActive && (
          <div className="p-4 bg-emerald-950 text-white rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-300 font-bold text-[11px]">
              <span>AI DEMO INSIGHT:</span>
              <span>{aiResponse?.confidence || '96% Confidence (Illustrative Result)'}</span>
            </div>
            <p className="text-emerald-100 leading-relaxed text-sm font-medium">{aiResponse?.insight}</p>
          </div>
        )}
      </Card>

      {/* 9. GIS REPORT GENERATOR FRONTEND PREVIEW (SECTION 18) */}
      <Card className="p-6 bg-white border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-800" />
              <span>Generate Demo GIS Spatial Report</span>
            </h3>
            <p className="text-xs text-slate-500">Configure parameters and generate an instant frontend GIS report preview.</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Frontend Preview Only
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Select Location</label>
            <input
              type="text"
              value={reportLocation}
              onChange={(e) => setReportLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-semibold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Time Period</label>
            <select
              value={reportTimeframe}
              onChange={(e) => setReportTimeframe(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-semibold"
            >
              <option value="2024–2026">2024–2026</option>
              <option value="2020–2025">2020–2025</option>
              <option value="2015–2025">2015–2025</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Land Use Category</label>
            <select
              value={reportCategory}
              onChange={(e) => setReportCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-semibold"
            >
              <option value="Agricultural Land">Agricultural Land</option>
              <option value="Built-up Area">Built-up Area</option>
              <option value="Forest Cover">Forest Cover</option>
              <option value="Water Bodies">Water Bodies</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Change Type</label>
            <select
              value={reportChangeType}
              onChange={(e) => setReportChangeType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-semibold"
            >
              <option value="Built-up Expansion">Built-up Expansion</option>
              <option value="Agricultural Conversion">Agricultural Conversion</option>
              <option value="Vegetation Change">Vegetation Change</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Risk Layer</label>
            <select
              value={reportRiskLayer}
              onChange={(e) => setReportRiskLayer(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-semibold"
            >
              <option value="Development Pressure">Development Pressure</option>
              <option value="Agricultural Conversion Risk">Agricultural Conversion Risk</option>
              <option value="Water-body Risk">Water-body Risk</option>
            </select>
          </div>
        </div>

        <Button
          onClick={handleGenerateReport}
          variant="primary"
          className="text-xs font-bold py-2.5 px-6 rounded-xl bg-[#064e3b]"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Demo GIS Report</span>
        </Button>

        {reportGenerated && (
          <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 text-xs border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <span className="font-extrabold text-emerald-400 text-sm">
                REPORT PREVIEW: {reportLocation} GIS Spatial Brief ({reportTimeframe})
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Demo Report Preview</span>
            </div>
            <div className="space-y-1 text-slate-200">
              <p><strong>Selected Target Category:</strong> {reportCategory}</p>
              <p><strong>Primary Spatial Metric:</strong> {reportChangeType} (+6.2% detected)</p>
              <p><strong>Risk Model:</strong> {reportRiskLayer} (HIGH RISK HOTSPOT)</p>
              <p className="text-emerald-300 font-mono text-[11px]">
                Summary: Spatial Remote Sensing shows significant non-farm built-up transition in peri-urban belts, encroaching on double-crop agricultural land.
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* 10. DUMMY DATASETS LISTING (SECTION 17) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-800" />
            <span>GIS Datasets Listing</span>
          </h3>
          <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-300">
            Frontend Demo Catalog
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_FEATURED_DATASETS.slice(0, 3).map((ds) => (
            <Card key={ds.id} className="bg-white border-slate-200 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 font-bold text-[10px]">
                  {ds.status}
                </span>
                <span className="text-[10px] font-bold text-slate-400">{ds.size}</span>
              </div>
              <h4 className="font-bold text-slate-800 text-xs">{ds.title}</h4>
              <p className="text-slate-600"><strong>Type:</strong> {ds.type}</p>
              <p className="text-slate-600"><strong>Coverage:</strong> {ds.coverage}</p>
              <p className="text-[11px] text-slate-500 font-mono">Provider: {ds.provider}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GISMapsPage;

