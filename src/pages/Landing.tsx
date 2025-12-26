import React from 'react';
import { Sparkles, Zap, ChevronRight, UploadCloud, FileCode, CheckCircle } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
      <div className="min-h-screen bg-midnight mesh-gradient overflow-y-auto overflow-x-hidden">
        <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">Latex<span className="text-indigo-400">AI</span></span>
          </div>
          <button onClick={onStart} className="px-6 py-2 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all font-semibold">Sign In</button>
        </nav>

        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold mb-8 animate-bounce">
            <Zap size={14} /> Intelligence-Driven Design
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
            Build Resumes with <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">Computational Elegance.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
            Forget manual formatting. Our AI engine parses your history and compiles it into industry-standard LaTeX architectures. Professional, precise, and powerful.
          </p>
          <div className="flex gap-6 mb-24">
            <button onClick={onStart} className="bg-white text-midnight px-10 py-5 rounded-2xl font-extrabold text-xl hover:scale-105 transition-all shadow-2xl shadow-white/10 flex items-center gap-3">
              Get Started <ChevronRight size={20} />
            </button>
            <button className="bg-slate-800/50 backdrop-blur text-white px-10 py-5 rounded-2xl font-extrabold text-xl hover:bg-slate-800 transition-all border border-slate-700">
              View Templates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { title: "AI Parsing", desc: "Upload any document; our Gemini-powered engine extracts every detail instantly.", icon: UploadCloud, color: "text-indigo-400" },
              { title: "LaTeX Compiling", desc: "Get that signature academic look with modern PDF standards and clean typography.", icon: FileCode, color: "text-rose-400" },
              { title: "ATS Optimization", desc: "Score and optimize your bullet points for the highest recruitment probability.", icon: CheckCircle, color: "text-emerald-400" }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 text-left hover:border-slate-700 transition-all group">
                <div className={`${feature.color} mb-6 p-4 rounded-2xl bg-slate-800/50 w-fit group-hover:scale-110 transition-transform`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};
