export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string; // "Present" or date
  location: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  link: string;
  technologies: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface CustomSectionItem {
  id: string;
  name: string; // e.g. Award Name, Publication Title
  location: string; // e.g. Issuer, Publisher
  startDate: string;
  endDate: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string; // e.g. "Volunteer", "Awards", "Publications"
  items: CustomSectionItem[];
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export type TemplateId = 'modern' | 'classic' | 'minimal' | 'professional';
// Added 'divider' and 'pageBreak' to SectionType
export type SectionType = 'summary' | 'experience' | 'projects' | 'education' | 'skills' | 'custom' | 'divider' | 'pageBreak';

export interface SectionStyle {
    font?: 'sans' | 'serif' | 'mono'; 
    size?: 'sm' | 'base' | 'lg';
}

export interface ResumeDesign {
  font: 'sans' | 'serif' | 'mono';
  spacing: 'compact' | 'normal' | 'spacious';
  sectionStyles: Partial<Record<SectionType, SectionStyle>>;
  pageBreaks: SectionType[]; 
}

export interface LayoutItem {
  id: string;
  type: SectionType;
}

export interface ResumeData {
  template: TemplateId;
  design: ResumeDesign;
  sectionOrder: LayoutItem[]; // Changed from SectionType[] to LayoutItem[] to allow duplicate spacers/dividers
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  customSections: CustomSection[];
}

export enum Step {
  Upload = 0,
  Personal = 1,
  Summary = 2,
  Experience = 3,
  Projects = 4,
  Education = 5,
  Skills = 6,
  Custom = 7,
  Design = 8,
  Review = 9,
}

export interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}