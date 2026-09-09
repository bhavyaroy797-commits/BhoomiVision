import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronRight, Map, Shield, Building, Sprout, Trees, Droplets, Grid } from 'lucide-react';

export const LayerControlPanel = ({ activeLayers, onToggleLayer, activeBaseMap, onSelectBaseMap }) => {
  const [openSections, setOpenSections] = useState({
    admin: true,
    lulc: true,
    basemap: true,
    tools: false,
  });

  const toggleSection = (section) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4 text-left text-xs font-sans">
      <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-2">
        <Layers className="w-4 h-4 text-emerald-800" />
        <span>Map Layers</span>
      </div>

      {/* 1. Administrative Boundaries */}
      <div className="border-b border-slate-100 pb-2">
        <button
          onClick={() => toggleSection('admin')}
          className="w-full flex items-center justify-between font-bold text-slate-800 py-1 hover:text-emerald-800"
        >
          <span className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
            <span>Administrative Boundaries</span>
          </span>
          {openSections.admin ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {openSections.admin && (
          <div className="pl-6 space-y-1.5 pt-1.5 text-slate-600 font-medium">
            {['India Boundary', 'State Boundary', 'District Boundary', 'Block Boundary', 'Village Boundary'].map((item) => (
              <label key={item} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={activeLayers.includes(item)}
                  onChange={() => onToggleLayer(item)}
                  className="rounded text-emerald-700 focus:ring-emerald-700"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 2. Land Use / Land Cover */}
      <div className="border-b border-slate-100 pb-2">
        <button
          onClick={() => toggleSection('lulc')}
          className="w-full flex items-center justify-between font-bold text-slate-800 py-1 hover:text-emerald-800"
        >
          <span className="flex items-center gap-2">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>Land Use / Land Cover</span>
          </span>
          {openSections.lulc ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {openSections.lulc && (
          <div className="pl-6 space-y-1.5 pt-1.5 text-slate-600 font-medium">
            {[
              { label: 'Agricultural Land', color: 'bg-emerald-500' },
              { label: 'Forest Land', color: 'bg-green-700' },
              { label: 'Built-up Area', color: 'bg-red-500' },
              { label: 'Water Bodies', color: 'bg-sky-500' },
              { label: 'Barren Land', color: 'bg-amber-500' },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={activeLayers.includes(item.label)}
                  onChange={() => onToggleLayer(item.label)}
                  className="rounded text-emerald-700 focus:ring-emerald-700"
                />
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. Base Map Selection */}
      <div className="border-b border-slate-100 pb-2">
        <button
          onClick={() => toggleSection('basemap')}
          className="w-full flex items-center justify-between font-bold text-slate-800 py-1 hover:text-emerald-800"
        >
          <span className="flex items-center gap-2">
            <Map className="w-3.5 h-3.5 text-emerald-700" />
            <span>Base Map</span>
          </span>
          {openSections.basemap ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {openSections.basemap && (
          <div className="pl-6 space-y-1.5 pt-1.5 text-slate-600 font-medium">
            {['Satellite Imagery', 'OpenStreetMap', 'Terrain', 'Google Maps'].map((bm) => (
              <label key={bm} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="radio"
                  name="basemapSelection"
                  checked={activeBaseMap === bm}
                  onChange={() => onSelectBaseMap(bm)}
                  className="text-emerald-700 focus:ring-emerald-700"
                />
                <span>{bm}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Analysis Tools */}
      <div>
        <button
          onClick={() => toggleSection('tools')}
          className="w-full flex items-center justify-between font-bold text-slate-800 py-1 hover:text-emerald-800"
        >
          <span className="flex items-center gap-2">
            <Grid className="w-3.5 h-3.5 text-emerald-700" />
            <span>Analysis Tools</span>
          </span>
          {openSections.tools ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {openSections.tools && (
          <div className="pl-6 space-y-1 pt-1.5 text-slate-600 font-medium">
            <p className="hover:text-emerald-800 cursor-pointer">✏️ Draw & Measure Area</p>
            <p className="hover:text-emerald-800 cursor-pointer">📅 Time Series Comparison</p>
            <p className="hover:text-emerald-800 cursor-pointer">📤 Upload Shapefile (.zip)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayerControlPanel;
