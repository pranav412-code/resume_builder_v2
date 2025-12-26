import React from 'react';
import { ResumeData, SectionType, LayoutItem } from '../../types';
import { Mail, Phone, MapPin, Scissors, Linkedin, Github, Globe } from 'lucide-react';

interface LivePreviewProps {
  data: ResumeData;
}

const LivePreview: React.FC<LivePreviewProps> = ({ data }) => {
  const { template, design, sectionOrder, personalInfo, summary, experience, education, skills, projects, customSections } = data;

  const fontClass = design.font === 'serif' ? 'font-serif' : design.font === 'mono' ? 'font-mono' : 'font-sans';
  const spacingClass = design.spacing === 'compact' ? 'leading-tight text-[10pt]' : design.spacing === 'spacious' ? 'leading-loose text-[11pt]' : 'leading-relaxed text-[10.5pt]';

  const renderSection = (item: LayoutItem) => {
    switch (item.type) {
      case 'divider':
        return <div key={item.id} className="h-px w-full bg-slate-100 my-4" />;
      case 'pageBreak':
        return (
          <div key={item.id} className="page-break my-6 relative flex items-center justify-center no-print">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dashed border-indigo-200"></div></div>
            <div className="relative bg-white px-3 text-[9px] text-indigo-300 font-bold uppercase tracking-widest">Page Boundary</div>
          </div>
        );
      case 'summary':
        return summary ? (
          <div key={item.id} className="mb-6">
            <h2 className="section-title">Professional Summary</h2>
            <p className="text-justify text-slate-700 whitespace-pre-wrap">{summary}</p>
          </div>
        ) : null;
      case 'experience':
        return experience.length > 0 ? (
          <div key={item.id} className="mb-6">
            <h2 className="section-title">Professional Trajectory</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-[9pt] font-medium text-slate-500 uppercase tracking-tighter">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[9.5pt] font-semibold text-indigo-600">{exp.company}</span>
                    <span className="text-[9pt] italic text-slate-400">{exp.location}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                    {exp.bullets.map((b, i) => b ? <li key={i}>{b}</li> : null)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      case 'education':
        return education.length > 0 ? (
          <div key={item.id} className="mb-6">
            <h2 className="section-title">Academic Background</h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                    <span className="text-[9pt] font-medium text-slate-500">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div className="text-[9.5pt] italic text-slate-600">{edu.degree} • {edu.location}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      case 'skills':
        return skills.length > 0 ? (
          <div key={item.id} className="mb-6">
            <h2 className="section-title">Core Competencies</h2>
            <div className="grid grid-cols-1 gap-2">
              {skills.map((cat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 text-[9pt] uppercase tracking-wider min-w-[120px]">{cat.name}:</span>
                  <span className="text-slate-700">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      default: return null;
    }
  };

  const templates = {
    modern: (
      <div className={`bg-white mx-auto w-[210mm] min-h-[297mm] p-[20mm] text-slate-900 shadow-2xl ring-1 ring-slate-100 ${fontClass} ${spacingClass}`} id="resume-preview">
        <header className="mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-1 leading-none">{personalInfo.fullName || "NAME PLACEHOLDER"}</h1>
          <p className="text-xl font-medium text-indigo-600 mb-6 tracking-tight uppercase leading-none">{personalInfo.title || "TITLE PLACEHOLDER"}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9pt] font-bold text-slate-400 tracking-widest">
            {personalInfo.email && <span className="flex items-center gap-1.5 uppercase"><Mail size={10} strokeWidth={3} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1.5 uppercase"><Phone size={10} strokeWidth={3} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1.5 uppercase"><MapPin size={10} strokeWidth={3} /> {personalInfo.location}</span>}
            {personalInfo.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors no-underline">
                <Globe size={10} strokeWidth={3} /> <span className="normal-case">{personalInfo.website}</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors no-underline">
                <Linkedin size={10} strokeWidth={3} /> <span className="normal-case">{personalInfo.linkedin}</span>
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors no-underline">
                <Github size={10} strokeWidth={3} /> <span className="normal-case">{personalInfo.github}</span>
              </a>
            )}
          </div>
        </header>
        <style>{`.section-title { @apply text-[9pt] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4 border-b-2 border-slate-50 pb-1; }`}</style>
        {sectionOrder.map(item => renderSection(item))}
      </div>
    ),
    classic: (
      <div className={`bg-white mx-auto w-[210mm] min-h-[297mm] p-[20mm] text-slate-900 font-serif ${spacingClass}`} id="resume-preview-classic">
        <div className="text-center mb-10 border-b-4 border-slate-900 pb-6">
          <h1 className="text-3xl font-bold uppercase tracking-[0.1em] mb-3">{personalInfo.fullName || "YOUR NAME"}</h1>
          <div className="text-[9pt] flex flex-wrap justify-center gap-4 text-slate-600 font-sans font-bold tracking-widest">
            {personalInfo.email && <span className="uppercase">{personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span className="uppercase">{personalInfo.phone}</span>}
            {personalInfo.location && <span>•</span>}
            {personalInfo.location && <span className="uppercase">{personalInfo.location}</span>}
            {personalInfo.website && <span>•</span>}
            {personalInfo.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors no-underline normal-case">
                {personalInfo.website}
              </a>
            )}
            {personalInfo.linkedin && <span>•</span>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors no-underline normal-case">
                {personalInfo.linkedin}
              </a>
            )}
            {personalInfo.github && <span>•</span>}
            {personalInfo.github && (
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors no-underline normal-case">
                {personalInfo.github}
              </a>
            )}
          </div>
        </div>
        <style>{`.section-title { @apply text-[10pt] font-bold uppercase border-b border-slate-900 mb-4 pb-0.5 text-slate-900; }`}</style>
        {sectionOrder.map(item => renderSection(item))}
      </div>
    ),
    professional: (
      <div className={`bg-white mx-auto w-[210mm] min-h-[297mm] p-[18mm] text-slate-950 font-sans text-sm`} id="resume-preview-professional">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light uppercase tracking-widest mb-4 border-b border-slate-100 pb-4">{personalInfo.fullName || "FULL NAME"}</h1>
          <div className="flex justify-center gap-4 text-[9pt] font-semibold tracking-widest text-slate-400">
            {personalInfo.email && <span className="uppercase">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="text-slate-200">/</span>}
            {personalInfo.phone && <span className="uppercase">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="text-slate-200">/</span>}
            {personalInfo.location && <span className="uppercase">{personalInfo.location}</span>}
            {personalInfo.website && <span className="text-slate-200">/</span>}
            {personalInfo.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors no-underline normal-case">
                {personalInfo.website}
              </a>
            )}
            {personalInfo.linkedin && <span className="text-slate-200">/</span>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors no-underline normal-case">
                {personalInfo.linkedin}
              </a>
            )}
            {personalInfo.github && <span className="text-slate-200">/</span>}
            {personalInfo.github && (
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors no-underline normal-case">
                {personalInfo.github}
              </a>
            )}
          </div>
        </div>
        <style>{`.section-title { @apply text-[10pt] uppercase tracking-[0.3em] border-l-4 border-indigo-600 pl-4 mb-6 mt-8 font-black text-slate-900; }`}</style>
        {sectionOrder.map(item => renderSection(item))}
      </div>
    )
  };

  return templates[template as keyof typeof templates] || templates.modern;
};

export default LivePreview;