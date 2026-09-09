import React, { useEffect, useRef } from 'react';
import { MapPin, Layers, ZoomIn, ZoomOut, Compass } from 'lucide-react';

export const LeafletMap = ({ center = [23.471, 88.556], zoom = 10, className = 'w-full h-full' }) => {
  return (
    <div className={`relative bg-emerald-950/90 rounded-2xl overflow-hidden shadow-inner ${className}`}>
      {/* SVG Vector Map Graphics representing spatial land-use layers */}
      <svg className="w-full h-full absolute inset-0 opacity-40 pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* River/Water vector */}
        <path
          d="M 100 0 Q 250 150 400 200 T 700 500"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="14"
          strokeOpacity="0.7"
        />

        {/* Agricultural Zones */}
        <polygon points="120,80 320,60 380,220 180,280" fill="#22c55e" fillOpacity="0.4" stroke="#16a34a" strokeWidth="1.5" />
        <polygon points="420,180 650,120 720,340 500,400" fill="#84cc16" fillOpacity="0.35" stroke="#65a30d" strokeWidth="1.5" />

        {/* Built-up expansion area */}
        <circle cx="380" cy="220" r="45" fill="#ef4444" fillOpacity="0.4" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="500" cy="310" r="35" fill="#f59e0b" fillOpacity="0.4" stroke="#d97706" strokeWidth="2" />
      </svg>

      {/* Map Control HUD Overlay */}
      <div className="absolute top-3 left-3 z-10 bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-bold">Nadia Spatial Survey • Lat: {center[0]}, Lon: {center[1]}</span>
      </div>

      {/* Map Tools */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button className="w-8 h-8 rounded-xl bg-slate-900/80 text-white flex items-center justify-center border border-slate-700 hover:bg-slate-800">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-xl bg-slate-900/80 text-white flex items-center justify-center border border-slate-700 hover:bg-slate-800">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-xl bg-slate-900/80 text-white flex items-center justify-center border border-slate-700 hover:bg-slate-800">
          <Compass className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

      {/* Legend Badge */}
      <div className="absolute bottom-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-700/80 space-y-1 text-left">
        <p className="text-[10px] font-bold text-slate-300 uppercase">LULC Layers</p>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Agriculture</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> Built-up</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span> Water</span>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
