import React, { useState } from 'react';
import { ResumeData } from '../../../types';
import { generateSummary, IS_AI_ENABLED } from '../../../services/geminiService';
import { Loader2, Wand2 } from 'lucide-react';

interface SummaryFormProps {
    data: ResumeData;
    updateData: (data: ResumeData) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ data, updateData }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleGenerate = async () => {
        if (!IS_AI_ENABLED) return;
        setIsProcessing(true);
        try {
            const s = await generateSummary(data);
            updateData({ ...data, summary: s });
        } catch (e) {
            console.error(e);
            // Minimal error handling for now
        }
        setIsProcessing(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <h3 className="text-white font-bold text-xl">Professional Summary</h3>
                {IS_AI_ENABLED && (
                    <button
                        onClick={handleGenerate}
                        disabled={isProcessing}
                        className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 hover:bg-indigo-500/20 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {isProcessing ? <Loader2 className="animate-spin" size={10} /> : <Wand2 size={10} />} AI Compose
                    </button>
                )}
            </div>
            <textarea
                className="w-full h-48 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition resize-none no-scrollbar"
                value={data.summary || ''}
                onChange={(e) => updateData({ ...data, summary: e.target.value })}
                placeholder="Write a brief summary of your professional background..."
            />
        </div>
    );
};
