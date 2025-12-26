import React from 'react';
import { STEPS } from '../../constants';
import { CheckCircle, CheckCircle2 } from 'lucide-react';

interface EditorNavigationProps {
    currentStep: number;
    onStepClick: (stepId: number) => void;
}

export const EditorNavigation: React.FC<EditorNavigationProps> = ({ currentStep, onStepClick }) => {
    const completedSteps = STEPS.filter(s => currentStep > s.id).length;
    const progress = Math.round((completedSteps / STEPS.length) * 100);

    return (
        <div className="space-y-4">
            {/* Progress Indicator */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Progress</span>
                    <span className="text-xs font-bold text-indigo-400">{progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Steps */}
            <div className="space-y-1">
                {STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;

                    return (
                        <div key={step.id} className="relative group">
                            {idx !== STEPS.length - 1 && (
                                <div className={`absolute left-5 top-10 w-1 h-full -ml-px transition-all duration-300 ${isCompleted ? 'bg-indigo-500' : 'bg-slate-800'}`}></div>
                            )}
                            <button
                                onClick={() => onStepClick(step.id)}
                                className={`relative flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-slate-900 shadow-lg' : 'hover:bg-slate-900/50'}`}
                            >
                                {/* Active state background glow */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-indigo-500/5 rounded-xl animate-pulse" />
                                )}

                                {/* Icon Circle */}
                                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                        ? 'bg-indigo-600 border-indigo-400 scale-110 shadow-lg shadow-indigo-500/30'
                                        : isCompleted
                                            ? 'bg-slate-950 border-indigo-500 shadow-md shadow-indigo-500/10'
                                            : 'bg-slate-950 border-slate-800 group-hover:border-slate-700'
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircle2 size={18} className="text-indigo-400" fill="currentColor" />
                                    ) : (
                                        <Icon size={16} className={isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-500'} />
                                    )}
                                </div>

                                {/* Label and Step Number */}
                                <div className="flex-1 text-left">
                                    <div className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : isCompleted ? 'text-slate-400' : 'text-slate-600 group-hover:text-slate-500'
                                        }`}>
                                        {step.label}
                                    </div>
                                    <div className="text-[9px] font-semibold text-slate-700 mt-0.5">
                                        Step {idx + 1} of {STEPS.length}
                                    </div>
                                </div>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
