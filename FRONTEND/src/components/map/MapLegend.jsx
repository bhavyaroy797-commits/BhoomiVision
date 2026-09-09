import React from 'react';

export const MapLegend = ({ activeLayers = [] }) => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-md text-left text-xs font-sans space-y-1.5 min-w-[160px]">
      <p className="font-bold text-slate-800 text-[11px] uppercase border-b border-slate-100 pb-1">
        Land Use / Land Cover Legend
      </p>

      <div className="space-y-1 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-amber-400 border border-amber-600 inline-block"></span>
          <span className="text-slate-700 font-semibold">Agricultural Land</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-emerald-600 border border-emerald-800 inline-block"></span>
          <span className="text-slate-700 font-semibold">Forest Land</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-red-500 border border-red-700 inline-block"></span>
          <span className="text-slate-700 font-semibold">Built-up Area</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-sky-500 border border-sky-700 inline-block"></span>
          <span className="text-slate-700 font-semibold">Water Bodies</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-amber-200 border border-amber-400 inline-block"></span>
          <span className="text-slate-700 font-semibold">Barren Land</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
