import React from 'react';
import { ResumeData, SkillCategory } from '../../../types';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
    data: ResumeData;
    updateData: (data: ResumeData) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, updateData }) => {
    const addCategory = () => {
        const newItem: SkillCategory = {
            name: "",
            skills: []
        };
        updateData({ ...data, skills: [...data.skills, newItem] });
    };

    const updateItem = (index: number, field: keyof SkillCategory, value: any) => {
        const newSkills = [...data.skills];
        newSkills[index] = { ...newSkills[index], [field]: value };
        updateData({ ...data, skills: newSkills });
    };

    const removeItem = (index: number) => {
        const newSkills = data.skills.filter((_, i) => i !== index);
        updateData({ ...data, skills: newSkills });
    };

    const updateSkillList = (index: number, value: string) => {
        const s = value.split(',').map(s => s.trim()); // Don't filter empty strings immediately to allow typing space effectively? No, comma split is robust enough.
        // Actually if user types "JS, " -> ["JS", ""]
        // I should allow trailing empty if I want to support implicit typing but splitting constantly might be annoying.
        // Better to hold local state? No, controlled component is fine for now.
        updateItem(index, 'skills', s.filter(x => x));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-white font-bold text-xl">Skills</h3>
            {data.skills.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 relative group">
                    <button onClick={() => removeItem(idx)} className="absolute top-4 right-4 text-slate-600 hover:text-rose-400 transition opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 gap-4">
                        <input className="bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Category Name (e.g. Languages, Tools)" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                        <div>
                            <label className="text-xs text-slate-500 block mb-1">Skills (Comma separated)</label>
                            <input className="w-full bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Java, Python, C++..." value={item.skills.join(', ')} onChange={e => updateSkillList(idx, e.target.value)} />
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={addCategory} className="w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-500 font-bold hover:text-white hover:border-slate-500 transition flex items-center justify-center gap-2">
                <Plus size={16} /> Add Skill Category
            </button>
        </div>
    );
}
