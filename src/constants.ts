import { Step, ResumeData } from './types';
import {
    UploadCloud,
    User,
    FileText,
    Briefcase,
    GraduationCap,
    Cpu,
    Settings2,
    CheckCircle,
    FolderOpen
} from 'lucide-react';

export const STEPS = [
    { id: Step.Upload, label: "Import Resume", icon: UploadCloud },
    { id: Step.Personal, label: "Personal Info", icon: User },
    { id: Step.Summary, label: "Professional Summary", icon: FileText },
    { id: Step.Experience, label: "Work Experience", icon: Briefcase },
    { id: Step.Projects, label: "Projects", icon: FolderOpen },
    { id: Step.Education, label: "Education", icon: GraduationCap },
    { id: Step.Skills, label: "Skills", icon: Cpu },
    { id: Step.Design, label: "Design", icon: Settings2 },
    { id: Step.Review, label: "Review", icon: CheckCircle },
];

export const INITIAL_DATA: ResumeData = {
    template: 'modern',
    design: {
        font: 'sans',
        spacing: 'normal',
        sectionStyles: {},
        pageBreaks: []
    },
    sectionOrder: [
        { id: 'summary', type: 'summary' },
        { id: 'experience', type: 'experience' },
        { id: 'projects', type: 'projects' },
        { id: 'education', type: 'education' },
        { id: 'skills', type: 'skills' }
    ],
    personalInfo: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    customSections: []
};
