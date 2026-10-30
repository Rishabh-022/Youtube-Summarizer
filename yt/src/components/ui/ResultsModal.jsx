import React, { useState } from 'react';
import { FileText, BookOpen, HelpCircle, Download, X, CheckCircle2, Clock } from 'lucide-react';
import { exportNotesToPDF } from '../../services/pdfExportService';
import confetti from 'canvas-confetti';

export function ResultsModal({ studyPackage, activeTab, onSelectTab, onClose }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  if (!studyPackage || !activeTab) return null;

  const handleDownloadPDF = () => {
    exportNotesToPDF(studyPackage);
    confetti({ particleCount: 50, spread: 45, origin: { y: 0.8 } });
  };

  return (
    <div className="fixed right-6 bottom-6 w-[560px] max-h-[75vh] flex flex-col glass-panel rounded-3xl z-30 shadow-2xl overflow-hidden border border-white/15">
      {/* Top Tabs */}
      <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('summary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'summary' ? 'bg-cyan-500 text-black' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Summary
          </button>
          <button
            onClick={() => onSelectTab('notes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'notes' ? 'bg-emerald-500 text-black' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Notes & PDF
          </button>
          <button
            onClick={() => onSelectTab('questions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'questions' ? 'bg-purple-500 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Quiz
          </button>
        </div>
        <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 overflow-y-auto space-y-5 text-sm text-slate-200">
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base">{studyPackage.videoTitle}</h3>
            <p className="bg-white/5 p-3 rounded-xl text-xs leading-relaxed text-slate-300">{studyPackage.summary.tl_dr}</p>
            <h4 className="text-xs uppercase font-bold text-cyan-400">Key Takeaways</h4>
            <div className="space-y-2">
              {studyPackage.summary.keyTakeaways.map((point, i) => (
                <div key={i} className="flex gap-2 text-xs bg-cyan-500/5 p-2.5 rounded-lg border border-cyan-500/10">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div>
                <p className="font-bold text-xs text-white">Formatted Study Guide</p>
                <p className="text-[11px] text-slate-400">Ready to print or save offline</p>
              </div>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 shadow-md"
              >
                <Download className="w-3.5 h-3.5" /> Save PDF
              </button>
            </div>
            {studyPackage.notes.sections.map((sec, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-xl space-y-1">
                <h5 className="font-bold text-xs text-emerald-400">{sec.heading}</h5>
                <p className="text-xs text-slate-300 leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold text-purple-400">Knowledge Retention Quiz</h4>
            {studyPackage.questions.map((q, idx) => (
              <div key={q.id} className="p-3.5 bg-white/5 rounded-xl space-y-2 text-xs">
                <p className="font-bold text-white">{idx + 1}. {q.question}</p>
                <div className="space-y-1.5">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => !submittedQuiz && setSelectedAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                      className={`w-full text-left p-2 rounded-lg border transition-all ${
                        selectedAnswers[q.id] === oIdx
                          ? 'bg-purple-500/20 border-purple-500 text-purple-200'
                          : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {!submittedQuiz && (
              <button
                onClick={() => {
                  setSubmittedQuiz(true);
                  confetti({ particleCount: 60, spread: 50 });
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-lg"
              >
                Check Answers
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}