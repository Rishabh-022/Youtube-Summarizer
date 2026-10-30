import React, { useState } from 'react';
import { Search, Loader2, Sparkles, Play } from 'lucide-react';

export function InputSection({ onProcessUrl, isProcessing }) {
  const [url, setUrl] = useState('');

  const sampleVideos = [
    { label: "AI & Neural Networks", url: "https://www.youtube.com/watch?v=aircAruvnKk" },
    { label: "Classic Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) onProcessUrl(url.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pointer-events-auto mt-1">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center glass-panel rounded-2xl p-2 glass-glow-cyan">
          <div className="pl-3 pr-2 text-cyan-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste any YouTube video link here..."
            className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-400 px-2"
          />
          <button
            type="submit"
            disabled={isProcessing || !url.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 transition-all disabled:opacity-50"
          >
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Generate</span>
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2 mt-2 px-2 text-xs text-slate-400">
        <span>Quick Test:</span>
        {sampleVideos.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setUrl(sample.url); onProcessUrl(sample.url); }}
            className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 flex items-center gap-1"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}