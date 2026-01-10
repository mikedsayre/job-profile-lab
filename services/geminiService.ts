import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { OptimizedProfileData, Experience } from '../types';

/**
 * Initializes the GoogleGenAI client with the API key from environment variables.
 * Assumes process.env.API_KEY is available during runtime.
 */
const getGenAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not set in environment variables.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Generates optimized LinkedIn profile data from raw resume text using the Gemini API.
 * The AI acts as an Executive Resume Writer and SEO Specialist.
 *
 * @param resumeText The raw text content of the user's resume.
 * @returns A Promise that resolves to an OptimizedProfileData object.
 * @throws An error if the API call fails or the response is invalid.
 */
export async function generateProfileData(resumeText: string): Promise<OptimizedProfileData> {
  const ai = getGenAIClient(); // Initialize client on demand

  const prompt = `
  You are an expert Executive Resume Writer and SEO Specialist. Your task is to analyze the provided resume text and rewrite it to create an optimized "LinkedIn Staging Object".
  
  Focus on identifying the user's core role and optimizing their experience and summary to include trending buzzwords and high-value search terms for the modern job market.
  
  The output MUST be a JSON object that strictly adheres to the following TypeScript schema:
  
  interface Experience {
    company: string;
    title: string;
    dates: string;
    description: string;
  }
  
  interface QuickGuide {
    headline: string;
    about: string;
    experience: string;
    skills: string;
  }
  
  interface OptimizedProfileData {
    headline_options: string[]; // Array of 3 distinct, high-impact headlines (max 220 chars each)
    about_section: string; // A compelling first-person narrative (max 2,600 chars). Include a "Specialties" keyword block at the bottom.
    experience: Experience[]; // Array of jobs. Each must have: company, title, dates, and description (rewritten as bullet points with metrics, max 2,000 chars per job).
    skills: string[]; // Array of 50 top relevant skills.
    quick_guide: QuickGuide; // A short, helpful tip for the user for each section (e.g., "Why did we write it this way?").
  }
  
  Ensure all character limits are respected. The 'dates' field in experience should be a single string (e.g., "Jan 2020 - Present").
  
  Here is the resume text:
  
  \`\`\`
  ${resumeText}
  \`\`\`
  
  Generate the JSON object based on these instructions.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using pro model for complex reasoning, writing, and SEO optimization.
      contents: { parts: [{ text: prompt }] },
      config: {
        systemInstruction: "You are an expert Executive Resume Writer and SEO Specialist. Generate JSON output.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline_options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Array of 3 distinct, high-impact headlines (max 220 chars each).',
            },
            about_section: {
              type: Type.STRING,
              description: 'A compelling first-person narrative (max 2,600 chars). Includes a "Specialties" keyword block at the bottom.',
            },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  company: { type: Type.STRING },
                  title: { type: Type.STRING },
                  dates: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['company', 'title', 'dates', 'description'],
                propertyOrdering: ['company', 'title', 'dates', 'description'],
              },
              description: 'Array of jobs. Each must have: company, title, dates, and description (rewritten as bullet points with metrics, max 2,000 chars per job).',
            },
            skills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Array of 50 top relevant skills.',
            },
            quick_guide: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                about: { type: Type.STRING },
                experience: { type: Type.STRING },
                skills: { type: Type.STRING },
              },
              required: ['headline', 'about', 'experience', 'skills'],
              propertyOrdering: ['headline', 'about', 'experience', 'skills'],
              description: 'A short, helpful tip for the user for each section.',
            },
          },
          required: ['headline_options', 'about_section', 'experience', 'skills', 'quick_guide'],
          propertyOrdering: ['headline_options', 'about_section', 'experience', 'skills', 'quick_guide'],
        },
      },
    });

    const jsonStr = response.text?.trim();

    if (!jsonStr) {
      throw new Error("Gemini API returned an empty response.");
    }

    const data: OptimizedProfileData = JSON.parse(jsonStr);

    // Basic validation of the structure
    if (!data.headline_options || !Array.isArray(data.headline_options) || data.headline_options.length === 0 ||
        !data.about_section ||
        !data.experience || !Array.isArray(data.experience) ||
        !data.skills || !Array.isArray(data.skills) || data.skills.length === 0 ||
        !data.quick_guide) {
      throw new Error("Invalid or incomplete data structure received from Gemini API.");
    }

    return data;

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
      throw new Error(`Failed to parse AI response as JSON. Raw response: ${error.message}`);
    } else if (error.message.includes("API_KEY")) {
       throw new Error("Gemini API Key is invalid or not configured correctly. Please check your API_KEY environment variable.");
    }
    throw new Error(`Gemini API error: ${error.message || 'Unknown error'}`);
  }
}