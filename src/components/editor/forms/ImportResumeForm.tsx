import React from 'react';
import { UploadCloud, PlusCircle, Loader2 } from 'lucide-react';

interface ImportResumeFormProps {
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isProcessing: boolean;
    onSkip: () => void;
}

export const ImportResumeForm: React.FC<ImportResumeFormProps> = ({ handleFileUpload, isProcessing, onSkip }) => {
    return (
        <div className="flex flex-col items-center py-12 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 border border-slate-800 shadow-2xl">
                <UploadCloud size={32} className="text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Import Resume</h2>
            <p className="text-slate-500 text-sm mb-8 px-8">Our AI extracts content from PDF/DOCX to populate the builder automatically.</p>
            <label className="w-full py-4 bg-white text-midnight rounded-2xl cursor-pointer hover:bg-slate-100 transition shadow-xl font-bold flex items-center justify-center gap-3">
                <PlusCircle size={20} /> Select Document
                <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileUpload} />
            </label>
            <button onClick={onSkip} className="mt-4 text-slate-500 hover:text-white transition text-sm font-semibold underline underline-offset-4">Skip, start from scratch</button>
            {isProcessing && <div className="mt-8 flex items-center gap-3 text-indigo-400 text-xs font-bold bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20"><Loader2 className="animate-spin" size={14} /> Intelligence parsing active...</div>}
        </div>
    )
}
