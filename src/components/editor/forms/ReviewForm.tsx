import React, { useState } from 'react';
import { ResumeData } from '../../../types';
import { generateLatex } from '../../../services/latexService';
import { downloadBlob } from '../../../services/latexCompiler';
import { Download, FileCode, Linkedin, FileText, ExternalLink } from 'lucide-react';

interface ReviewFormProps {
    data: ResumeData;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ data }) => {
    const handleDownloadLatex = () => {
        const latex = generateLatex(data);
        const blob = new Blob([latex], { type: 'text/plain' });
        downloadBlob(blob, 'resume.tex');
    };

    const handleOpenOverleaf = () => {
        const latex = generateLatex(data);
        // Download the LaTeX file
        const blob = new Blob([latex], { type: 'text/plain' });
        downloadBlob(blob, 'resume.tex');

        // Open Overleaf in new tab with instructions
        setTimeout(() => {
            window.open('https://www.overleaf.com/project', '_blank');
            alert('LaTeX file downloaded!\n\nNext steps:\n1. Go to Overleaf (opening now...)\n2. Click "New Project" → "Upload Project"\n3. Upload the downloaded resume.tex file\n4. Click "Recompile" to generate your PDF\n5. Download the PDF from Overleaf');
        }, 500);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-white font-bold text-xl">Export Architecture</h3>

            {/* Professional PDF via Overleaf */}
            <button
                onClick={handleOpenOverleaf}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-500 transition shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-3"
            >
                <FileText size={24} />
                Generate Professional PDF
                <ExternalLink size={18} />
            </button>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 -mt-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">How it works:</strong> Downloads your LaTeX file and opens Overleaf (free online LaTeX editor). Upload the file there to compile a professional PDF with precise 1cm margins.
                </p>
            </div>

            {/* Quick PDF (Browser) */}
            <button
                onClick={() => window.print()}
                className="w-full py-4 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
                <Download size={18} />
                Quick PDF (Browser Print)
            </button>

            <p className="text-xs text-slate-500 text-center -mt-4">
                Instant PDF with 1cm margins - good for quick preview
            </p>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={handleDownloadLatex}
                    className="p-4 rounded-xl border border-slate-800 text-slate-400 font-bold text-xs hover:bg-slate-900 transition flex items-center justify-center gap-2"
                >
                    <FileCode size={16} />
                    LaTeX Source
                </button>
                <button
                    className="p-4 rounded-xl border border-slate-800 text-slate-400 font-bold text-xs hover:bg-slate-900 transition flex items-center justify-center gap-2"
                >
                    <Linkedin size={16} />
                    Sync Profile
                </button>
            </div>

            {/* Instructions */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-black uppercase text-slate-500 mb-2">💡 Pro Tip</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                    For the highest quality PDF, use the <strong className="text-indigo-400">Professional PDF</strong> option.
                    It uses LaTeX (the gold standard for academic and professional documents) to create a perfectly formatted resume.
                </p>
            </div>
        </div>
    )
}
