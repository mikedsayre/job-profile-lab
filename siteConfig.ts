import { OptimizedProfileData } from './types';

interface FieldConstraint {
  max: number;
  required: boolean;
  min?: number; // Optional minimum length
}

interface PlatformConfig {
  name: string;
  fields: {
    headline: FieldConstraint;
    about: FieldConstraint;
    experience_title: FieldConstraint;
    experience_description: FieldConstraint;
    skills_count: FieldConstraint;
    // Potentially other fields like education, licenses, etc.
  };
  guide_text: {
    [key in keyof OptimizedProfileData | 'general' | 'experience_item' | 'skills_item' | 'header' | 'input_section']?: string;
  };
}

export const PLATFORMS: { [key: string]: PlatformConfig } = {
  LINKEDIN: {
    name: "LinkedIn",
    fields: {
      headline: { max: 220, required: true },
      about: { max: 2600, required: true },
      experience_title: { max: 100, required: true }, // Max characters for job title
      experience_description: { max: 2000, required: true }, // Max characters for job description per entry
      skills_count: { max: 50, min: 1, required: true } // Max number of skills
    },
    guide_text: {
      header: "The navigation bar provides quick access to core functions: Home/New Optimization, Download Plan, and a Tutorial/Help guide.",
      input_section: "Paste your resume text here. Our AI will read, optimize, and structure your content to maximize its impact on job search platforms.",
      general: "Review each section carefully. The AI has optimized this content based on trending keywords for your role. Pay attention to character limits.",
      headline_options: "These headlines are crafted to be attention-grabbing and keyword-rich, maximizing your visibility in recruiter searches for the modern job market.",
      about_section: "LinkedIn uses the first few lines of your About section as a 'hook'. We've optimized your opening for impact. The 'Specialties' block enhances keyword density.",
      experience: "Each experience entry has been rewritten as achievement-oriented bullet points, focusing on metrics and high-value action verbs relevant to the modern job market.",
      experience_item: "Focus on quantifiable achievements. The AI has tried to inject relevant keywords and metrics to showcase your impact effectively for the current job market.",
      skills: "This list of 50 skills is curated to reflect the most sought-after abilities in your field, boosting your profile's searchability and relevance for the current job market.",
      skills_item: "These are critical skills identified by the AI as highly relevant and trending for your target role. Ensure they accurately reflect your expertise."
    }
  },
  INDEED: {
    name: "Indeed",
    fields: {
      headline: { max: 120, required: false }, // Indeed often pulls title from experience, but users can add a summary/objective.
      about: { max: 2000, required: false }, // Roughly for summary/objective section
      experience_title: { max: 100, required: true },
      experience_description: { max: 1500, required: true }, // Indeed often has slightly smaller description limits
      skills_count: { max: 30, required: true } // Indeed might prefer a more concise skills list
    },
    guide_text: {
      general: "Indeed often prioritizes direct experience and skills. Ensure your descriptions are concise and impactful for this platform."
    }
  },
  GLASSDOOR: {
    name: "Glassdoor",
    fields: {
      headline: { max: 150, required: false }, // Usually for a resume headline or objective
      about: { max: 2500, required: false }, // For a summary/objective section
      experience_title: { max: 100, required: true },
      experience_description: { max: 1800, required: true },
      skills_count: { max: 40, required: true }
    },
    guide_text: {
      general: "Glassdoor combines job search with company insights. Keep your profile sharp, as employers may review it alongside company reviews."
    }
  }
};