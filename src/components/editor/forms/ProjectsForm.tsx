import React from 'react';
import { ResumeData, ProjectItem } from '../../../types';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
    data: ResumeData;
    updateData: (data: ResumeData) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, updateData }) => {
    const addProject = () => {
        const newItem: ProjectItem = {
            id: crypto.randomUUID(),
            name: "",
            description: "",
            link: "",
            technologies: []
        };
        updateData({ ...data, projects: [...data.projects, newItem] });
    };

    const updateItem = (index: number, field: keyof ProjectItem, value: any) => {
        const newProj = [...data.projects];
        newProj[index] = { ...newProj[index], [field]: value };
        updateData({ ...data, projects: newProj });
    };

    const removeItem = (index: number) => {
        const newProj = data.projects.filter((_, i) => i !== index);
        updateData({ ...data, projects: newProj });
    };

    const updateTechs = (index: number, value: string) => {
        const techs = value.split(',').map(s => s.trim()).filter(s => s);
        updateItem(index, 'technologies', techs);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-white font-bold text-xl">Projects</h3>
            {data.projects.map((item, idx) => (
                <div key={item.id} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 relative group">
                    <button onClick={() => removeItem(idx)} className="absolute top-4 right-4 text-slate-600 hover:text-rose-400 transition opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 gap-4">
                        <input className="bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Project Name" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                        <textarea className="w-full bg-slate-950/50 rounded-lg p-2 text-sm text-slate-300 outline-none resize-none focus:ring-1 focus:ring-indigo-500/50" rows={3} placeholder="Description" value={item.description} onChange={e => updateItem(idx, 'description', e.target.value)} />
                        <input className="bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="Link (URL)" value={item.link} onChange={e => updateItem(idx, 'link', e.target.value)} />
                        <div>
                            <label className="text-xs text-slate-500 block mb-1">Technologies (Comma separated)</label>
                            <input className="w-full bg-transparent border-b border-slate-700 p-2 text-white placeholder-slate-600 outline-none focus:border-indigo-500" placeholder="React, Node.js, Python..." value={item.technologies.join(', ')} onChange={e => updateTechs(idx, e.target.value)} />
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={addProject} className="w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-500 font-bold hover:text-white hover:border-slate-500 transition flex items-center justify-center gap-2">
                <Plus size={16} /> Add Project
            </button>
        </div>
    );
}
