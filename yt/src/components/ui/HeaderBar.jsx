import React from 'react';
import { Play, Box } from 'lucide-react';

export function HeaderBar() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 pointer-events-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
          <Play className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white">NEXUS<span className="text-cyan-400">3D</span></h1>
          <p className="text-xs text-slate-400">YouTube 3D Summary, Notes & Quiz</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel text-xs text-slate-300">
        <Box className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span>Click any 3D station or drag to orbit</span>
      </div>
    </header>
  );
}