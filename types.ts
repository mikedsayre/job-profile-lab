export interface Experience {
  company: string;
  title: string;
  dates: string; // e.g., "Jan 2020 - Present"
  description: string; // Rewritten bullet points with metrics
}

export interface QuickGuide {
  headline: string;
  about: string;
  experience: string;
  skills: string;
  general?: string; // General advice for the entire staging area
}

export interface OptimizedProfileData {
  headline_options: string[]; // Array of 3 distinct, high-impact headlines
  about_section: string; // A compelling first-person narrative
  experience: Experience[]; // Array of job experiences
  skills: string[]; // Array of 50 top relevant skills
  quick_guide: QuickGuide; // A short, helpful tip for each section
}

export interface FieldConstraint {
  max: number;
  required: boolean;
  min?: number;
}