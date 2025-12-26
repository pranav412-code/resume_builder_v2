import React from 'react';
import { ResumeData, EducationItem } from '../../../types';
import { Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
    data: ResumeData;
    updateData: (data: ResumeData) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, updateData }) => {
    const addEducation = () => {
        const newItem: EducationItem = {
            id: crypto.randomUUID(),
            institution: "",
            degree: "",
            startDate: "",
            endDate: "",
            location: ""
        };
        updateData({ ...data, education: [...data.education, newItem] });
    };

    const updateItem = (index: number, field: keyof EducationItem, value: any) => {
        const newEdu = [...data.education];
        newEdu[index] = { ...newEdu[index], [field]: value };
        updateData({ ...data, education: newEdu });
    };

    const removeItem = (index: number) => {
        const newEdu = data.education.filter((_, i) => i !== index);
        updateData({ ...data, education: newEdu });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-white font-bold text-xl">Education</h3>
            {data.education.map((item, idx) => (
                <div key={item.id} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 relative group">
                    <button onClick={() => removeItem(idx)} className="absolute top-4 right-4 text-slate-600 hover:text-rose-400 transition opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 gap-4">
                        <input className="bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Institution / University" value={item.institution} onChange={e => updateItem(idx, 'institution', e.target.value)} />
                        <input className="bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Degree / Major" value={item.degree} onChange={e => updateItem(idx, 'degree', e.target.value)} />
                        <div className="grid grid-cols-2 gap-4">
                            <input className="bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Location" value={item.location} onChange={e => updateItem(idx, 'location', e.target.value)} />
                            <div className="flex gap-2">
                                <input className="flex-1 bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Start Year" value={item.startDate} onChange={e => updateItem(idx, 'startDate', e.target.value)} />
                                <input className="flex-1 bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="End Year" value={item.endDate} onChange={e => updateItem(idx, 'endDate', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={addEducation} className="w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-500 font-bold hover:text-white hover:border-slate-500 transition flex items-center justify-center gap-2">
                <Plus size={16} /> Add School
            </button>
        </div>
    );
}
