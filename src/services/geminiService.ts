
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

// Check if AI is enabled
export const IS_AI_ENABLED = !!process.env.API_KEY;

// Initialize the client only if the key is present to avoid crash
const ai = IS_AI_ENABLED ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

// Helper to clean JSON string if markdown code blocks are present
const cleanJsonString = (str: string) => {
  return str.replace(/```json/g, '').replace(/```/g, '').trim();
};

const RESUME_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    personalInfo: {
      type: Type.OBJECT,
      properties: {
        fullName: { type: Type.STRING },
        title: { type: Type.STRING },
        email: { type: Type.STRING },
        phone: { type: Type.STRING },
        location: { type: Type.STRING },
        website: { type: Type.STRING },
        linkedin: { type: Type.STRING },
        github: { type: Type.STRING },
      }
    },
    summary: { type: Type.STRING },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          role: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING },
          location: { type: Type.STRING },
          bullets: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          institution: { type: Type.STRING },
          degree: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING },
          location: { type: Type.STRING },
        }
      }
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          skills: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          link: { type: Type.STRING },
          technologies: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  }
};

export const parseResumeText = async (text: string): Promise<Partial<ResumeData>> => {
  if (!ai) {
    console.warn("AI parsing is disabled because API_KEY is missing.");
    return { template: 'modern' };
  }

  // Use gemini-3-flash-preview for general text parsing tasks
  const model = 'gemini-3-flash-preview';

  const response = await ai.models.generateContent({
    model,
    contents: `Parse the following resume text into a structured JSON format matching the schema provided. 
    Resume Text:
    ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: RESUME_SCHEMA,
    },
  });

  const jsonStr = cleanJsonString(response.text || '{}');
  const parsed = JSON.parse(jsonStr);
  return { ...parsed, template: 'modern' }; // Default to modern
};

export const parseResumeFile = async (base64Data: string, mimeType: string): Promise<Partial<ResumeData>> => {
  if (!ai) {
    console.warn("AI parsing is disabled because API_KEY is missing.");
    return { template: 'modern' };
  }

  // Use gemini-3-flash-preview for document processing tasks
  const model = 'gemini-3-flash-preview';

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        },
        {
          text: "Parse this resume document into a structured JSON format matching the schema provided."
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: RESUME_SCHEMA,
    },
  });

  const jsonStr = cleanJsonString(response.text || '{}');
  const parsed = JSON.parse(jsonStr);
  return { ...parsed, template: 'modern' }; // Default to modern
};

export const improveBulletPoint = async (bullet: string, role: string): Promise<string> => {
  if (!ai) return bullet;

  // Use gemini-3-flash-preview for basic text tasks
  const model = 'gemini-3-flash-preview';

  const response = await ai.models.generateContent({
    model,
    contents: `Rewrite the following resume bullet point for a "${role}" role. 
    Make it more impactful, results-oriented, and concise. Use active verbs.
    Original: "${bullet}"
    
    Return ONLY the rewritten bullet point text, nothing else.`,
  });

  return response.text?.trim() || bullet;
};

export const generateSummary = async (resumeData: ResumeData): Promise<string> => {
  if (!ai) return "";

  // Use gemini-3-flash-preview for summarization tasks
  const model = 'gemini-3-flash-preview';
  const context = JSON.stringify(resumeData.experience.slice(0, 3)); // Send top 3 experiences for context

  const response = await ai.models.generateContent({
    model,
    contents: `Write a professional 3-sentence resume summary based on this experience data: ${context}. 
      Focus on key achievements and skills. Return ONLY the summary text.`,
  });

  return response.text?.trim() || "";
};

export const enhanceSectionContent = async (text: string, sectionTitle: string): Promise<string> => {
  if (!ai) return text;

  // Use gemini-3-flash-preview for general text enhancement tasks
  const model = 'gemini-3-flash-preview';

  const prompt = `
    Act as a world-class professional resume writer. Rewrite the following content for a resume section titled "${sectionTitle}".
    
    Strict Guidelines:
    1. **Tone:** Professional, authoritative, and impactful. Use active voice.
    2. **Grammar & Vocabulary:** Fix all grammar errors. Use varied, sophisticated vocabulary (synonyms) to avoid repetition.
    3. **Quantification:** If the input describes a task or responsibility, TRANSFORM it into an achievement. Add *realistic* quantification (numbers, percentages, time saved) appropriate for this context. If exact numbers aren't in the input, estimate plausible metrics based on industry standards for this role/task.
    4. **Output:** Return ONLY the rewritten text block. Do not add conversational filler.
    
    Input Content:
    "${text}"
    `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text?.trim() || text;
};

export const analyzeResume = async (resumeData: ResumeData) => {
  if (!ai) return { score: 0, strengths: [], weaknesses: [], suggestions: [] };

  // Using gemini-3-pro-preview for complex reasoning and analysis tasks
  const model = 'gemini-3-pro-preview';

  const prompt = `Analyze this resume data deeply. 
  1. Give a score from 0-100 based on impact, clarity, and completeness.
  2. List 3 key strengths.
  3. List 3 key weaknesses.
  4. Provide 3 concrete actionable suggestions for improvement.
  
  Resume Data:
  ${JSON.stringify(resumeData)}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 1024 }, // Thinking budget for deeper analysis
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });

  const jsonStr = cleanJsonString(response.text || '{}');
  return JSON.parse(jsonStr);
};
