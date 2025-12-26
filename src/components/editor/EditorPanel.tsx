import React from 'react';
import { ResumeData, Step } from '../../types';
import { STEPS } from '../../constants';
import { EditorNavigation } from './EditorNavigation';
import { Sparkles, ChevronRight } from 'lucide-react';

import { ImportResumeForm } from './forms/ImportResumeForm';
import { PersonalForm } from './forms/PersonalForm';
import { SummaryForm } from './forms/SummaryForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { DesignForm } from './forms/DesignForm';
import { ReviewForm } from './forms/ReviewForm';

interface EditorPanelProps {
    currentStep: number;
    setCurrentStep: (s: number) => void;
    resumeData: ResumeData;
    setResumeData: (d: ResumeData) => void;
    isProcessing: boolean;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onGoHome: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
    currentStep, setCurrentStep,
    resumeData, setResumeData,
    isProcessing, handleFileUpload,
    onGoHome
}) => {

    const updateData = (newData: ResumeData) => setResumeData(newData);

    const handleNext = () => {
        const currentIndex = STEPS.findIndex(s => s.id === currentStep);
        if (currentIndex < STEPS.length - 1) {
            setCurrentStep(STEPS[currentIndex + 1].id);
        }
    };

    const handleBack = () => {
        const currentIndex = STEPS.findIndex(s => s.id === currentStep);
        if (currentIndex > 0) {
            setCurrentStep(STEPS[currentIndex - 1].id);
        }
    };

    const isLastStep = currentStep === Step.Review; // Or check via index

    return (
        <div className="w-full md:w-[450px] flex flex-col h-full bg-slate-950 border-r border-slate-800 z-20 no-print">
            <div className="p-6 border-b border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer" onClick={onGoHome}>
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
                        <Sparkles className="text-white w-4 h-4" />
                    </div>
                    <span className="text-lg font-black text-white tracking-tight">LATEX<span className="text-indigo-500">AI</span></span>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-800">Studio v2.5</div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 bg-slate-950">
                {currentStep !== Step.Upload && (
                    <EditorNavigation currentStep={currentStep} onStepClick={setCurrentStep} />
                )}

                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {currentStep === Step.Upload && <ImportResumeForm handleFileUpload={handleFileUpload} isProcessing={isProcessing} onSkip={() => setCurrentStep(Step.Personal)} />}
                    {currentStep === Step.Personal && <PersonalForm data={resumeData} updateData={updateData} />}
                    {currentStep === Step.Summary && <SummaryForm data={resumeData} updateData={updateData} />}
                    {currentStep === Step.Experience && <ExperienceForm data={resumeData} updateData={updateData} />}
                    {currentStep === Step.Projects && <ProjectsForm data={resumeData} updateData={updateData} />}
                    {currentStep === Step.Education && <EducationForm data={resumeData} updateData={updateData} />}
                    {currentStep === Step.Skills && <SkillsForm data={resumeData} updateData={updateData} />}
                    {currentStep === Step.Design && <DesignForm data={resumeData} updateData={updateData} />}
                    {currentStep === Step.Review && <ReviewForm data={resumeData} />}
                </div>
            </div>

            {currentStep !== Step.Upload && (
                <div className="p-6 bg-slate-950 border-t border-slate-900 flex justify-between">
                    <button
                        onClick={handleBack}
                        className="px-6 py-3 rounded-xl border border-slate-800 text-slate-400 font-bold hover:bg-slate-900 transition"
                        disabled={currentStep === Step.Upload} // Or if index 0 logic is safer
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                    >
                        {isLastStep ? 'Finish' : 'Advance'} <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    )
}
