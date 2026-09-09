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
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LeafletMap from '../../components/map/LeafletMap';
import LayerControlPanel from '../../components/map/LayerControlPanel';
import MapLegend from '../../components/map/MapLegend';
import BhuvanLayer from '../../components/map/BhuvanLayer';
import {
  GIS_FEATURE_TABS,
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
  const [activeBaseMap, setActiveBaseMap] = useState('Satellite Imagery');

  // Location Hierarchy state
  const [selectedState, setSelectedState] = useState('West Bengal');
  const [selectedDistrict, setSelectedDistrict] = useState('North 24 Parganas');
  const [selectedBlock, setSelectedBlock] = useState('Barasat');
  const [selectedVillage, setSelectedVillage] = useState('Barasat North');

  // Timeline year state
  const [timelineYear, setTimelineYear] = useState(2025);

  // AI Assistant state ("Ask the Map")
  const [mapQuery, setMapQuery] = useState('');
  const [aiActive, setAiActive] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Field Verification state
  const [verifications, setVerifications] = useState(MOCK_FIELD_VERIFICATION_QUEUE);

  // Saved map views
  const [savedAreas, setSavedAreas] = useState(['North 24 Parganas District']);

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
    }, 600);
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

  return (
    <div className="space-y-8 text-left pb-12 font-sans bg-slate-50/40 p-2 sm:p-4 rounded-3xl">
      {/* 1. COMPACT GIS WORKSPACE HEADER (SECTION 4) */}
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
              GIS Intelligence Workspace
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Monitor land-use change, analyse spatial patterns, and identify geographic risks across India's cadastral and satellite datasets.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 z-10">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <p className="text-[10px] text-emerald-200 uppercase font-semibold">Active Spatial Location</p>
              <p className="text-xs font-bold text-white">{selectedDistrict}, {selectedState}</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <p className="text-[10px] text-emerald-200 uppercase font-semibold">Satellite Feed Status</p>
              <p className="text-xs font-bold text-emerald-300">Sentinel-2 (Demo Sync)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GIS OPERATIONAL ROLE NAVIGATION / FEATURE TABS (SECTION 3) */}
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

      {/* 3. GIS WORKSPACE QUICK TOOLS BAR (SECTION 24) */}
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

      {/* 4. PRIMARY MAP WORKSPACE (SECTION 5 & 6) */}
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
                  placeholder="Search location (State, District, Block, Plot Cadastral ID...)"
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

            {/* Map Canvas */}
            <div className="h-[480px] relative">
              <LeafletMap center={[22.7214, 88.4816]} zoom={11} className="w-full h-full" />

              {/* Bhuvan Layer Badge Overlay */}
              <div className="absolute top-3 left-3 z-10">
                <BhuvanLayer />
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-3 left-3 z-10">
                <MapLegend activeLayers={activeLayers} />
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: LOCATION INTELLIGENCE & AREA PANEL (3 COLS) (SECTION 7 & 17) */}
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
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  <option value="West Bengal">West Bengal</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  <option value="North 24 Parganas">North 24 Parganas</option>
                  <option value="Nadia">Nadia</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Sub-District / Block</label>
                <select
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  <option value="Barasat">Barasat</option>
                  <option value="Habra">Habra</option>
                  <option value="Krishnanagar">Krishnanagar</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Village / Area</label>
                <select
                  value={selectedVillage}
                  onChange={(e) => setSelectedVillage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  <option value="Barasat North">Barasat North</option>
                  <option value="Krishnanagar North">Krishnanagar North</option>
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

          {/* Area Intelligence Card */}
          <Card className="p-4 bg-slate-50 border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>Area Intelligence</span>
              </div>

              <button
                onClick={() => toggleSaveArea(`${selectedBlock}, ${selectedDistrict}`)}
                className="text-[11px] text-emerald-800 font-semibold hover:underline flex items-center gap-1"
              >
                {savedAreas.includes(`${selectedBlock}, ${selectedDistrict}`) ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                    <span>Save Area</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold">{selectedBlock}, {selectedDistrict}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Area:</span>
                <span className="font-bold">{MOCK_LULC_STATS.totalAreaSqKm} km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">LULC Change Rate:</span>
                <span className="font-bold text-amber-700">+18.2% Sprawl</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Risk Level:</span>
                <span className="font-bold text-red-700">High Risk (Hotspot)</span>
              </div>
            </div>

            <Link to="/reports" className="block">
              <Button variant="outline" size="sm" className="w-full text-xs font-semibold rounded-xl">
                <span>Generate Area Report →</span>
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* 5. ASK THE MAP (GIS AI ASSISTANT - SECTION 11 & 20) */}
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
            placeholder="e.g. Where is built-up expansion highest in North 24 Parganas?"
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

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-slate-500 font-bold text-[11px]">Suggested Spatial Queries:</span>
          {[
            'Where is built-up expansion highest?',
            'Show areas with agricultural land conversion.',
            'Which areas have high development pressure?',
            'Show water-body shrinkage hotspots.',
          ].map((sq, i) => (
            <button
              key={i}
              onClick={() => {
                setMapQuery(sq);
                handleAskMap(sq);
              }}
              className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-medium"
            >
              💡 {sq}
            </button>
          ))}
        </div>

        {aiActive && (
          <div className="p-4 bg-emerald-950 text-white rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-300 font-bold text-[11px]">
              <span>AI MAP INSIGHT (Demo AI):</span>
              <span>{aiResponse?.confidence || '96% Confidence'}</span>
            </div>
            <p className="text-emerald-100 leading-relaxed">{aiResponse?.insight}</p>
          </div>
        )}
      </Card>

      {/* 6. SPATIAL RISK & HOTSPOT INTELLIGENCE (SECTION 12) */}
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

      {/* 7. FIELD VERIFICATION QUEUE & OBSERVATION (SECTION 13 & 14) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                        onClick={() => markVerified(item.id)}
                        className="text-emerald-800 font-bold hover:underline"
                      >
                        {item.status === 'Verified' ? 'Verified' : 'Mark Verified'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* SATELLITE INTELLIGENCE (SECTION 15) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 bg-white border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-800" />
                <span>Satellite Intelligence Metadata</span>
              </h3>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p><strong>Provider:</strong> {MOCK_SATELLITE_INTELLIGENCE.provider}</p>
              <p><strong>Last Pass Date:</strong> {MOCK_SATELLITE_INTELLIGENCE.lastPassDate}</p>
              <p><strong>Cloud Inundation:</strong> {MOCK_SATELLITE_INTELLIGENCE.cloudCover}</p>
              <p><strong>Resolution:</strong> {MOCK_SATELLITE_INTELLIGENCE.resolution}</p>
              <p><strong>Bands:</strong> {MOCK_SATELLITE_INTELLIGENCE.activeSensors.join(', ')}</p>
            </div>

            <Button variant="outline" className="w-full text-xs font-semibold py-2 rounded-xl">
              <span>View Multi-Spectral Bands →</span>
            </Button>
          </Card>
        </div>
      </div>

      {/* 8. LAND CHANGE TIMELINE & DETECTED CHANGES (SECTION 9 & 16) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 bg-white border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-800" />
                <span>Land Change Timeline (2010–2025)</span>
              </h3>
            </div>

            <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl">
              {[2010, 2015, 2020, 2025].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setTimelineYear(yr)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    timelineYear === yr
                      ? 'bg-[#064e3b] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Year {yr}
                </button>
              ))}
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/70 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">
                {timelineYear === 2025 && '2025: High-Res Drone Orthomosaic Sync & DILRMP GIS Integration'}
                {timelineYear === 2020 && '2020: Sentinel-2 Multi-Spectral Baseline for Sprawl'}
                {timelineYear === 2015 && '2015: Initial Landsat LULC Time-Series Mapping'}
                {timelineYear === 2010 && '2010: Historical Baseline Satellite Survey'}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {timelineYear === 2025 && 'Detected 18.2% expansion in built-up area along NH-34 corridor with 12.4% reduction in cropland.'}
                {timelineYear === 2020 && 'Baseline agricultural zoning established across Krishnanagar & Ranaghat blocks.'}
                {timelineYear === 2015 && 'Early suburban cluster formation observed near Krishnanagar rail junction.'}
                {timelineYear === 2010 && 'Dominant agricultural land use with minimal non-farm encroachment.'}
              </p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 bg-white border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-800" />
              <span>Detected Spatial Changes</span>
            </h3>

            <div className="space-y-3">
              {MOCK_DETECTED_CHANGES.map((chg) => (
                <div key={chg.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900">{chg.changeType}</span>
                    <span className="text-[10px] font-semibold text-slate-400">{chg.period}</span>
                  </div>
                  <p className="text-slate-600">Location: {chg.location}</p>
                  <p className="text-slate-600 font-semibold">Area: {chg.areaAffected}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 9. CROSS-MODULE CONNECTIONS: RESEARCH & POLICY (SECTION 18 & 19) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>Research Linked to Spatial Area</span>
          </h3>

          <Card className="bg-white border-slate-200 p-5 space-y-3">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 text-[10px] font-bold">
                GIS Study
              </span>
              <h4 className="font-bold text-slate-800 text-xs">Land Use Transformation and Agricultural Shrinkage in Nadia</h4>
              <p className="text-xs text-slate-600">ISRO-NRSC study verifying satellite cropland shrinkage.</p>
            </div>
            <Link to="/research">
              <Button variant="outline" className="w-full text-xs font-semibold py-1.5 mt-1">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Explore Full Research Study</span>
              </Button>
            </Link>
          </Card>
        </div>

        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-800" />
            <span>Policy Impact on Selected Spatial Area</span>
          </h3>

          <Card className="bg-white border-slate-200 p-5 space-y-3">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 text-[10px] font-bold">
                Land Policy
              </span>
              <h4 className="font-bold text-slate-800 text-xs">Digital India Land Records Modernization (DILRMP)</h4>
              <p className="text-xs text-slate-600">Drone cadastral survey policy regulating non-farm land conversions.</p>
            </div>
            <Link to="/policy-innovation">
              <Button variant="outline" className="w-full text-xs font-semibold py-1.5 mt-1">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Policy Intelligence</span>
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GISMapsPage;
