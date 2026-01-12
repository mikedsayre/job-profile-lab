import React from 'react';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { PLATFORMS } from '../siteConfig';
import { HEADER_LOGO_PLACEHOLDER_URL, SPECS_TAGLINE, APP_NAME } from '../constants'; // Import mascot URL and tagline

interface TutorialPageProps {
  onBackToApp: () => void;
}

export const TutorialPage: React.FC<TutorialPageProps> = ({ onBackToApp }) => {
  const LINKEDIN_CONFIG = PLATFORMS.LINKEDIN;

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <Card className="p-6 md:p-8 w-full">
        {/* Mascot Image and Tagline at the Top */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={HEADER_LOGO_PLACEHOLDER_URL}
            alt={`${APP_NAME} Mascot Specs`}
            className="w-24 h-24 sm:w-32 sm:h-32 mb-3 rounded-full border-2 border-orange-500 shadow-lg shadow-amber-500/30"
            aria-hidden="true"
          />
          <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 text-glow text-center mb-4">
            {SPECS_TAGLINE}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6 border-b border-orange-700 pb-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 text-glow">
            App Tutorial & Guide
          </h2>
          <Button onClick={onBackToApp} className="bg-orange-600 hover:bg-orange-700 px-4 py-2 text-sm md:text-base">
            Back to App
          </Button>
        </div>

        <div className="text-amber-200 custom-scrollbar pr-2 max-h-[calc(100vh-250px)] overflow-y-auto">
          <p className="mb-6 text-lg leading-relaxed text-amber-100">
            Welcome to the **Job Profile Lab**! This tool leverages advanced AI to transform your raw resume into an SEO-optimized profile, making it easier for recruiters to find you on platforms like LinkedIn.
          </p>

          {/* New Section: Problem it Solves */}
          <div className="bg-slate-700 bg-opacity-50 p-6 rounded-lg mb-8 border border-orange-600 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 text-glow">
              Tired of Endless Tweaks? Here's the Solution.
            </h3>
            <p className="text-lg leading-relaxed text-amber-100 mb-4">
              You've poured hours into crafting the perfect resume, but then comes the painful reality:
              translating it into an optimized job site profile. Figuring out the best keywords,
              compelling headlines, and most impactful skill lists for LinkedIn, Indeed, and
              Glassdoor can be exhausting and time-consuming.
            </p>
            <p className="text-lg leading-relaxed text-amber-100">
              The **Job Profile Lab** eliminates this struggle. We turn that complex, multi-platform
              optimization into a simple, guided process. With our app, you get:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base pl-4 mt-4 text-amber-200">
              <li>Instant, AI-generated keyword-rich content.</li>
              <li>Multiple, high-impact headline options.</li>
              <li>A comprehensive, editable staging area for all key sections.</li>
              <li>One-click copy for individual sections or *all* optimizations at once.</li>
              <li>A downloadable, structured plan for offline reference.</li>
            </ul>
            <p className="mt-4 text-lg leading-relaxed text-orange-300 font-semibold">
              Spend less time optimizing and more time getting hired.
            </p>
          </div>
          {/* End New Section */}

          <h3 className="text-2xl font-bold mt-8 mb-4 text-orange-400 text-glow">How It Works</h3>
          <ol className="list-decimal list-inside space-y-4 text-base pl-4 mb-8">
            <li>
              <strong className="text-orange-300">Paste Your Resume:</strong> Start by pasting your resume's plain text content into the input box on the main page. The AI needs this raw data to understand your experience and skills.
              <p className="mt-2 text-sm text-amber-300 italic">{LINKEDIN_CONFIG.guide_text.input_section}</p>
            </li>
            <li>
              <strong className="text-orange-300">Optimize Profile:</strong> Click the "Optimize Profile" button. Our AI (acting as an Executive Resume Writer and SEO Specialist) will analyze your text, identify your core role, and begin rewriting your content with trending buzzwords and high-value search terms for your field.
            </li>
            <li>
              <strong className="text-orange-300">Review & Stage:</strong> Once optimized, you'll be presented with the "Job Site Profile Stager" interface. This is your workspace to review and refine the AI-generated content.
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>
                  <strong className="text-amber-300">Left Column (Sections):</strong> This vertical list shows all the key sections of your job site profile (Header, About, Experience entries, Skills). Click on any card to view its detailed content on the right.
                  <p className="mt-1 text-sm text-amber-300 italic">{LINKEDIN_CONFIG.guide_text.general}</p>
                </li>
                <li>
                  <strong className="text-amber-300">Right Column (Details & Tips):</strong> Here you'll see the full, optimized content for the currently selected section.
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>
                      <strong className="text-amber-300">Headlines:</strong> If "Header & Headline" is selected, you'll find 3 distinct headline options. Choose the one that best suits you.
                      <p className="mt-1 text-sm text-amber-300 italic">{LINKEDIN_CONFIG.guide_text.headline_options}</p>
                    </li>
                    <li>
                      <strong className="text-amber-300">Character Counts:</strong> Every text block displays a character count (`current / max`). If the text exceeds the maximum allowed for a profile section, it will be highlighted in orange.
                    </li>
                    <li>
                      <strong className="text-amber-300">One-Click Copy:</strong> Each content block has a "COPY TO CLIPBOARD" button for easy transfer.
                    </li>
                    <li>
                      <strong className="text-amber-300">Quick Guide Tip:</strong> At the top of the right column, you'll find a contextual tip explaining *why* the content was optimized that way, offering insights into SEO and best practices.
                    </li>
                    <li>
                      <strong className="text-amber-300">Copy All Optimizations:</strong> Below the Quick Guide Tip, this powerful button allows you to copy *all* generated content (headlines, about, experience, skills) with one click, ready to paste into your word processor for further editing.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <strong className="text-orange-300">Update Your Profile:</strong> Simply copy the optimized content from our staging area (either section-by-section or all at once) and paste it into the corresponding fields on your chosen job site profile edit page.
            </li>
          </ol>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-orange-400 text-glow">Key Sections Explained</h3>

          <ul className="list-disc list-inside space-y-6 text-base pl-4 mb-8">
            <li>
              <strong className="text-orange-300">Header & Headline:</strong> Your headline is crucial for first impressions.
              <p className="mt-2 text-sm text-amber-300 italic">{LINKEDIN_CONFIG.guide_text.headline_options}</p>
            </li>
            <li>
              <strong className="text-orange-300">About Section:</strong> This is your professional narrative.
              <p className="mt-2 text-sm text-amber-300 italic">{LINKEDIN_CONFIG.guide_text.about_section}</p>
            </li>
            <li>
              <strong className="text-orange-300">Experience:</strong> Showcase your career achievements.
              <p className="mt-2 text-sm text-amber-300 italic">{LINKEDIN_CONFIG.guide_text.experience}</p>
              <p className="mt-1 text-sm text-amber-300 italic">Specific job details: {LINKEDIN_CONFIG.guide_text.experience_item}</p>
            </li>
            <li>
              <strong className="text-orange-300">Skills:</strong> Highlight your core competencies.
              <p className="mt-2 text-sm text-amber-300 italic">{LINKEDIN_CONFIG.guide_text.skills}</p>
              <p className="mt-1 text-sm text-amber-300 italic">Individual skills: {LINKEDIN_CONFIG.guide_text.skills_item}</p>
            </li>
          </ul>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-orange-400 text-glow">Additional Tips</h3>
          <ul className="list-disc list-inside space-y-4 text-base pl-4 mb-8">
            <li><strong className="text-amber-300">Download Plan:</strong> Use the "Download Plan" button in the header to save a **structured Markdown (.md) file** of your optimized profile, including all guide texts. This file is excellent for offline reference and easy copy-pasting into text or word editors (you can open .md files in any text editor, and copy-paste content into word processors where you can apply rich formatting).</li>
            <li><strong className="text-amber-300">New Optimization:</strong> Click "New Optimization" in the header to clear your current session and start fresh.</li>
            <li><strong className="text-amber-300">Your Data:</strong> We prioritize your privacy. All resume text is processed securely and is never stored on our servers.</li>
          </ul>

          <div className="flex justify-center mt-10">
            <Button onClick={onBackToApp} className="bg-orange-600 hover:bg-orange-700 px-6 py-3 text-lg">
              Got It! Back to App
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};