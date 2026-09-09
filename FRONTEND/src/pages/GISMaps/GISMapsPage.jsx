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

  // Quick Analysis Form state
  const [analysisTab, setAnalysisTab] = useState('By Location');
  const [selectedState, setSelectedState] = useState('West Bengal');
  const [selectedDistrict, setSelectedDistrict] = useState('Nadia');
  const [selectedBlock, setSelectedBlock] = useState('Krishnanagar');
  const [selectedVillage, setSelectedVillage] = useState('-- Select Village --');

  // Timeline year state
  const [timelineYear, setTimelineYear] = useState(2025);

  // AI Assistant state
  const [aiActive, setAiActive] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Saved map views
  const [savedAreas, setSavedAreas] = useState([]);

  const toggleLayer = (layerName) => {
    if (activeLayers.includes(layerName)) {
      setActiveLayers(activeLayers.filter((l) => l !== layerName));
    } else {
      setActiveLayers([...activeLayers, layerName]);
    }
  };

  const handleGenerateAnalysis = () => {
    setAiLoading(true);
    setAiActive(true);
    setTimeout(() => {
      const resp = getAIGISResponse(`Generate spatial analysis for ${selectedBlock}, ${selectedDistrict}`, `${selectedDistrict}, ${selectedState}`);
      setAiResponse(resp);
      setAiLoading(false);
    }, 500);
  };

  const toggleSaveArea = () => {
    const name = `${selectedBlock}, ${selectedDistrict}`;
    if (savedAreas.includes(name)) {
      setSavedAreas(savedAreas.filter((a) => a !== name));
    } else {
      setSavedAreas([...savedAreas, name]);
    }
  };

  return (
    <div className="space-y-8 text-left pb-12 font-sans">
      {/* 1. HEADER / BREADCRUMB WITH QUOTE BOX (MATCHING IMAGE 5 MOCKUP) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Link to="/dashboard/public" className="hover:underline">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 font-normal">GIS & Maps</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0f766e] p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
              <Globe className="w-3.5 h-3.5 text-emerald-300" />
              <span>National Spatial Intelligence Studio</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              GIS & Maps
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Visualize land, analyze patterns, and explore geospatial insights across India.
            </p>
          </div>

          {/* Floating Quote Box (Matching Image 5 Mockup) */}
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-xs text-right hidden sm:block shrink-0">
            <p className="text-xs italic font-medium text-emerald-100 leading-snug">
              "Maps turn data into direction."
            </p>
            <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-emerald-300 mt-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BHOOMIVISION Spatial Lab</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP FEATURE TABS (MATCHING IMAGE 5 MOCKUP) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {GIS_FEATURE_TABS.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 group ${
                isSelected
                  ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-md'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <Map className="w-4 h-4" />
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

      {/* 3. MAIN 3-COLUMN MAP WORKSPACE STUDIO (EXACT MATCH FOR IMAGE 5 MOCKUP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: MAP LAYERS PANEL (3 COLS) */}
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
                  placeholder="Search location (State, District, Block, Village...)"
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <select className="bg-slate-50 border border-slate-200 text-xs px-2 py-1.5 rounded-xl text-slate-700 font-semibold">
                  <option value="India">India</option>
                  <option value="West Bengal">West Bengal</option>
                </select>

                <button
                  type="button"
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs flex items-center gap-1 font-semibold"
                  title="Full Screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Full Screen</span>
                </button>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="h-[480px] relative">
              <LeafletMap center={[23.471, 88.556]} zoom={10} className="w-full h-full" />

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

        {/* RIGHT COLUMN: QUICK ANALYSIS & MAP INFO (3 COLS) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Quick Analysis Form */}
          <Card className="p-4 bg-white border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs border-b border-slate-100 pb-2">
              <Zap className="w-4 h-4 text-emerald-700" />
              <span>Quick Analysis</span>
            </div>

            {/* Form Tabs */}
            <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl text-[11px] font-semibold text-slate-600">
              {['By Location', 'By Layer', 'By Area'].map((tb) => (
                <button
                  key={tb}
                  onClick={() => setAnalysisTab(tb)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    analysisTab === tb ? 'bg-emerald-800 text-white font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  {tb}
                </button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="space-y-2 text-left">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Select State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  <option value="West Bengal">West Bengal</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Select District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  <option value="Nadia">Nadia</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Select Block</label>
                <select
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  <option value="Krishnanagar">Krishnanagar</option>
                  <option value="Ranaghat">Ranaghat</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Select Village (Optional)</label>
                <select
                  value={selectedVillage}
                  onChange={(e) => setSelectedVillage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-2 text-slate-800 font-semibold"
                >
                  <option value="-- Select Village --">-- Select Village --</option>
                  <option value="Krishnanagar North">Krishnanagar North</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleGenerateAnalysis}
              variant="primary"
              className="w-full text-xs font-semibold py-2.5 rounded-xl"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Generate Map & Analysis</span>
            </Button>
          </Card>

          {/* Map Info Card */}
          <Card className="p-4 bg-slate-50 border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>Map Info</span>
              </div>

              <button
                onClick={toggleSaveArea}
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
                <span className="text-slate-500">State:</span>
                <span className="font-bold">{selectedState}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">District:</span>
                <span className="font-bold">{selectedDistrict}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Block:</span>
                <span className="font-bold">{selectedBlock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Area (Approx.):</span>
                <span className="font-bold">{MOCK_LULC_STATS.totalAreaSqKm} km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Population (2021):</span>
                <span className="font-bold">{MOCK_LULC_STATS.population}</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full text-xs font-semibold rounded-xl">
              <span>View Detailed Report →</span>
            </Button>
          </Card>
        </div>
      </div>

      {/* 4. AI SPATIAL ASSISTANT RESPONSE CARD (WHEN ACTIVE) */}
      {aiActive && (
        <Card className="bg-gradient-to-br from-emerald-950 via-[#064e3b] to-teal-950 text-white p-6 rounded-3xl space-y-4 border-none shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-700/50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/80 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">BHOOMIVISION GIS Intelligence</h3>
                <p className="text-[11px] text-emerald-200">Grounded Spatial Analytics Engine</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-600">
                Confidence: {aiResponse?.confidence || '96%'}
              </span>
              <button onClick={() => setAiActive(false)} className="text-emerald-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {aiLoading ? (
            <div className="py-6 text-center text-emerald-200 text-xs">Transposing satellite bands & spatial vectors...</div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-emerald-300 font-semibold uppercase">Spatial Query:</p>
              <p className="text-sm font-bold text-white italic">"{aiResponse?.query}"</p>
              <div className="p-4 bg-emerald-900/60 rounded-2xl border border-emerald-700/60 text-xs text-emerald-100 leading-relaxed">
                {aiResponse?.insight}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* 5. TIME-SERIES MAP TIMELINE & DETECTED CHANGES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* TIMELINE SLIDER (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 bg-white border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-800" />
                  <span>Explore Land Change Over Time</span>
                </h3>
                <p className="text-xs text-slate-500">Multi-temporal satellite monitoring (*Illustrative Timeline*)</p>
              </div>
            </div>

            {/* Timeline Year Tabs */}
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
                {timelineYear === 2020 && '2020: Sentinel-2 Multi-Spectral Baseline for Nadia Sprawl'}
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

        {/* DETECTED LAND CHANGES (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 bg-white border-slate-200 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-800" />
                <span>Detected Land Changes</span>
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
            </div>
          </Card>
        </div>
      </div>

      {/* 6. BOTTOM DATA SECTION (3 CARDS - EXACT MATCH FOR IMAGE 5 MOCKUP) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Land Use Statistics (Selected Area) */}
        <Card className="p-5 bg-white border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase">Land Use Statistics (Selected Area)</h4>
            <BarChart3 className="w-4 h-4 text-emerald-800" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <div className="w-28 h-28 rounded-full border-8 border-emerald-600 border-t-amber-400 border-r-sky-400 flex items-center justify-center font-extrabold text-sm text-[#064e3b]">
                1,248 km²
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {MOCK_LULC_STATS.categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.name}</span>
                  </span>
                  <span className="font-bold text-slate-800">{cat.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Card 2: Recent Maps */}
        <Card className="p-5 bg-white border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase">Recent Maps</h4>
            <span className="text-xs text-emerald-800 font-bold hover:underline cursor-pointer">View All →</span>
          </div>

          <div className="space-y-3">
            {MOCK_RECENT_MAPS.map((mp) => (
              <div key={mp.id} className="p-2.5 bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200 flex items-center justify-between transition-colors">
                <div>
                  <h5 className="font-bold text-xs text-slate-800">{mp.title}</h5>
                  <p className="text-[10px] text-slate-500">{mp.date} • <span className="font-semibold text-emerald-800">{mp.layerType}</span></p>
                </div>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-800 hover:bg-slate-100">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Card 3: Featured Datasets */}
        <Card className="p-5 bg-white border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase">Featured Datasets</h4>
            <span className="text-xs text-emerald-800 font-bold hover:underline cursor-pointer">View All →</span>
          </div>

          <div className="space-y-3">
            {MOCK_FEATURED_DATASETS.map((ds) => (
              <div key={ds.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-slate-800">{ds.title}</h5>
                  <p className="text-[10px] font-semibold text-slate-500">{ds.size}</p>
                </div>
                <Button variant="outline" size="sm" className="text-[11px] py-1 px-2.5 rounded-lg">
                  <span>Download</span>
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GISMapsPage;
