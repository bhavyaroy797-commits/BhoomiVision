import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';

export const BhuvanLayer = ({ active = true, onToggle }) => {
  return (
    <div className="bg-emerald-950/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-700/60 flex items-center gap-2 text-xs">
      <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
      <span className="font-bold">ISRO Bhuvan Spatial Layer</span>
      <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded text-emerald-200 font-semibold">Active</span>
    </div>
  );
};

export default BhuvanLayer;
