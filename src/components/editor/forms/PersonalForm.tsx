import React from 'react';
import { ResumeData } from '../../../types';

interface PersonalFormProps {
    data: ResumeData;
    updateData: (data: ResumeData) => void;
}

export const PersonalForm: React.FC<PersonalFormProps> = ({ data, updateData }) => {
    const handleChange = (field: string, value: string) => {
        updateData({
            ...data,
            personalInfo: {
                ...data.personalInfo,
                [field]: value
            }
        });
    };

    const fields = ['fullName', 'title', 'email', 'phone', 'location', 'website', 'linkedin', 'github'];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-white font-bold text-xl">Personal Info</h3>
            <div className="space-y-4">
                {fields.map((field) => (
                    <div key={field} className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-tighter ml-1">
                            {field.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                            type="text"
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 outline-none transition"
                            value={(data.personalInfo as any)[field] || ''}
                            onChange={(e) => handleChange(field, e.target.value)}
                            placeholder={`Enter your ${field}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
