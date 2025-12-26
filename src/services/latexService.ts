import { ResumeData, SectionType, LayoutItem } from '../types';

const escapeLatex = (text: string | undefined): string => {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([\u0026%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

const formatDate = (date: string) => escapeLatex(date);

export const generateLatex = (data: ResumeData): string => {
  const { template, design, personalInfo, summary, experience, education, skills, projects, customSections, sectionOrder } = data;

  const preamble = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\geometry{left=1cm, right=1cm, top=1cm, bottom=1cm}
\\definecolor{accent}{RGB}{79, 70, 229}
\\pagestyle{empty}
\\titleformat{\\section}{\\large\\bfseries\\color{accent}\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{8pt}{4pt}
\\setlist{nosep,leftmargin=*}
\\hypersetup{colorlinks=true,linkcolor=accent,urlcolor=accent}
\\begin{document}
`;

  // Header with social links
  const socialLinks = [];
  if (personalInfo.email) socialLinks.push(escapeLatex(personalInfo.email));
  if (personalInfo.phone) socialLinks.push(escapeLatex(personalInfo.phone));
  if (personalInfo.location) socialLinks.push(escapeLatex(personalInfo.location));
  if (personalInfo.website) {
    const url = personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`;
    socialLinks.push(`\\href{${escapeLatex(url)}}{${escapeLatex(personalInfo.website)}}`);
  }
  if (personalInfo.linkedin) {
    const url = personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`;
    socialLinks.push(`\\href{${escapeLatex(url)}}{LinkedIn}`);
  }
  if (personalInfo.github) {
    const url = personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`;
    socialLinks.push(`\\href{${escapeLatex(url)}}{GitHub}`);
  }

  const headerContent = `{\\Huge \\textbf{${escapeLatex(personalInfo.fullName)}}} \\\\[4pt]
{\\Large \\color{accent} ${escapeLatex(personalInfo.title)}} \\\\[6pt]
${socialLinks.join(' $\\cdot$ ')}
\\vspace{1em}

`;

  const generateContent = (item: LayoutItem) => {
    let out = '';

    // Page break from manual insertion
    if (item.type === 'pageBreak') return '\\newpage\n';

    switch (item.type) {
      case 'divider':
        return '\\hrulefill\\vspace{1em}\n';

      case 'summary':
        if (!summary) return '';
        return `\\section*{Professional Summary}
${escapeLatex(summary)}

`;

      case 'experience':
        if (experience.length === 0) return '';
        out += `\\section*{Work Experience}\n`;
        experience.forEach(exp => {
          out += `\\noindent \\textbf{${escapeLatex(exp.role)}} \\hfill ${formatDate(exp.startDate)} -- ${formatDate(exp.endDate)} \\\\
\\emph{${escapeLatex(exp.company)}} \\hfill ${escapeLatex(exp.location)}
\\begin{itemize}[noitemsep,topsep=2pt]
${exp.bullets.map(b => `  \\item ${escapeLatex(b)}`).join('\n')}
\\end{itemize}
\\vspace{0.5em}
`;
        });
        return out;

      case 'projects':
        if (!projects || projects.length === 0) return '';
        out += `\\section*{Projects}\n`;
        projects.forEach(proj => {
          const techList = Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies;
          out += `\\noindent \\textbf{${escapeLatex(proj.name)}}${proj.link ? ` \\href{${escapeLatex(proj.link)}}{[Link]}` : ''} \\\\
${techList ? `\\emph{${escapeLatex(techList)}}\\\\` : ''}
${escapeLatex(proj.description)}
\\vspace{0.5em}
`;
        });
        return out;


      case 'education':
        if (education.length === 0) return '';
        out += `\\section*{Education}\n`;
        education.forEach(edu => {
          out += `\\noindent \\textbf{${escapeLatex(edu.institution)}} \\hfill ${formatDate(edu.startDate)} -- ${formatDate(edu.endDate)} \\\\
${escapeLatex(edu.degree)} \\hfill ${escapeLatex(edu.location)}
\\vspace{0.5em}
`;
        });
        return out;

      case 'skills':
        if (!skills || skills.length === 0) return '';
        out += `\\section*{Skills}\n`;
        skills.forEach(category => {
          if (category.skills && category.skills.length > 0) {
            out += `\\noindent \\textbf{${escapeLatex(category.name)}:} ${category.skills.map(s => escapeLatex(s)).join(', ')}

`;
          }
        });
        return out;

      default:
        return '';
    }
  };

  let bodyContent = '';
  sectionOrder.forEach(item => {
    bodyContent += generateContent(item);
  });

  return preamble + headerContent + bodyContent + `\\end{document}`;
};