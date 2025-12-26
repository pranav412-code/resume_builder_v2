import React from 'react';
import { ResumeData, ExperienceItem } from '../../../types';
import { Plus, Trash2 } from 'lucide-react';

interface ExperienceFormProps {
    data: ResumeData;
    updateData: (data: ResumeData) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, updateData }) => {
    const addExperience = () => {
        const newItem: ExperienceItem = {
            id: crypto.randomUUID(),
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            location: "",
            bullets: [""]
        };
        updateData({ ...data, experience: [...data.experience, newItem] });
    };

    const updateItem = (index: number, field: keyof ExperienceItem, value: any) => {
        const newExp = [...data.experience];
        newExp[index] = { ...newExp[index], [field]: value };
        updateData({ ...data, experience: newExp });
    };

    const removeItem = (index: number) => {
        const newExp = data.experience.filter((_, i) => i !== index);
        updateData({ ...data, experience: newExp });
    };

    const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
        const newExp = [...data.experience];
        newExp[expIndex].bullets[bulletIndex] = value;
        updateData({ ...data, experience: newExp });
    };

    const addBullet = (expIndex: number) => {
        const newExp = [...data.experience];
        newExp[expIndex].bullets.push("");
        updateData({ ...data, experience: newExp });
    };

    const removeBullet = (expIndex: number, bulletIndex: number) => {
        const newExp = [...data.experience];
        newExp[expIndex].bullets = newExp[expIndex].bullets.filter((_, i) => i !== bulletIndex);
        updateData({ ...data, experience: newExp });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-white font-bold text-xl">Work Experience</h3>
            {data.experience.map((item, idx) => (
                <div key={item.id} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 relative group">
                    <button onClick={() => removeItem(idx)} className="absolute top-4 right-4 text-slate-600 hover:text-rose-400 transition opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-2 gap-4">
                        <input className="bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Company" value={item.company} onChange={e => updateItem(idx, 'company', e.target.value)} />
                        <input className="bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Role" value={item.role} onChange={e => updateItem(idx, 'role', e.target.value)} />
                        <input className="bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Location" value={item.location} onChange={e => updateItem(idx, 'location', e.target.value)} />
                        <div className="flex gap-2">
                            <input className="flex-1 bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Start Date" value={item.startDate} onChange={e => updateItem(idx, 'startDate', e.target.value)} />
                            <input className="flex-1 bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="End Date" value={item.endDate} onChange={e => updateItem(idx, 'endDate', e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Achievements</label>
                        {item.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex gap-2 items-start group/bullet">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                                <textarea className="w-full bg-slate-950/50 rounded-lg p-2 text-sm text-slate-300 outline-none resize-none focus:ring-1 focus:ring-indigo-500/50" rows={2} value={b} onChange={e => updateBullet(idx, bIdx, e.target.value)} />
                                <button onClick={() => removeBullet(idx, bIdx)} className="text-slate-600 hover:text-rose-400 opacity-0 group-hover/bullet:opacity-100"><Trash2 size={12} /></button>
                            </div>
                        ))}
                        <button onClick={() => addBullet(idx)} className="text-xs text-indigo-400 font-bold hover:text-indigo-300 ml-4">+ Add Bullet</button>
                    </div>
                </div>
            ))}
            <button onClick={addExperience} className="w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-500 font-bold hover:text-white hover:border-slate-500 transition flex items-center justify-center gap-2">
                <Plus size={16} /> Add Position
            </button>
        </div>
    );
}
