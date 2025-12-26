import React, { useState, useEffect } from 'react';
import { ResumeData, Step } from '../types';
import { EditorPanel } from '../components/editor/EditorPanel';
import LivePreview from '../components/preview/LivePreview';
import { parseResumeFile } from '../services/geminiService';
import { INITIAL_DATA } from '../constants';

interface EditorProps {
    onGoHome: () => void;
}

export const Editor: React.FC<EditorProps> = ({ onGoHome }) => {
    const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
    const [currentStep, setCurrentStep] = useState<number>(Step.Upload);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('resumeData');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with initial data to ensure new fields are present
                setResumeData({ ...INITIAL_DATA, ...parsed });
            } catch (e) {
                console.error("Failed to load saved data", e);
            }
        }

        const savedStep = localStorage.getItem('currentStep');
        if (savedStep) {
            setCurrentStep(Number(savedStep));
        }
    }, []);

    useEffect(() => {
        if (resumeData !== INITIAL_DATA) {
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
        }
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem('currentStep', String(currentStep));
    }, [currentStep]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsProcessing(true);
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Part = (reader.result as string).split(',')[1];
            try {
                const parsed = await parseResumeFile(base64Part, file.type);
                setResumeData(prev => {
                    const merged = { ...prev, ...parsed };
                    // Ensure IDs for arrays
                    if (merged.experience) merged.experience = merged.experience.map(x => ({ ...x, id: x.id || crypto.randomUUID() }));
                    if (merged.education) merged.education = merged.education.map(x => ({ ...x, id: x.id || crypto.randomUUID() }));
                    if (merged.projects) merged.projects = merged.projects.map(x => ({ ...x, id: x.id || crypto.randomUUID() }));
                    if (merged.skills) merged.skills = merged.skills.map(x => ({ ...x, skills: x.skills || [] }));
                    return merged as ResumeData;
                });
                setCurrentStep(Step.Personal);
            } catch (error) {
                console.error("Parsing failed", error);
                alert("Failed to parse resume. Please try again or skip.");
            }
            setIsProcessing(false);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex h-screen w-full bg-midnight overflow-hidden">
            <EditorPanel
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                resumeData={resumeData}
                setResumeData={setResumeData}
                isProcessing={isProcessing}
                handleFileUpload={handleFileUpload}
                onGoHome={onGoHome}
            />
            <div id="preview-container" className="flex-1 mesh-gradient overflow-y-auto p-12 relative flex justify-center">
                <div className="transition-all duration-700 hover:scale-[1.01]">
                    {/* Assuming LivePreview default export works */}
                    <LivePreview data={resumeData} />
                </div>
                <div className="fixed bottom-8 right-8 flex items-center gap-4 no-print">
                    <div className="px-4 py-2 rounded-full bg-midnight/80 backdrop-blur border border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3 shadow-2xl">
                        <span className="flex items-center gap-1.5 text-indigo-400"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div> Render Live</span>
                        <span className="text-slate-800">|</span>
                        A4 Compliant
                    </div>
                </div>
            </div>
        </div>
    );
};
