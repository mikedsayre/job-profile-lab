import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { OptimizedProfileData, Experience } from '../types';
import { PLATFORMS } from '../siteConfig';
import { Card } from './common/Card';
import { CharacterCounter } from './common/CharacterCounter';
import { CopyButton } from './common/CopyButton';
// Add missing import for Button component
import { Button } from './common/Button';
// import { HelpIcon } from './common/HelpIcon'; // HelpIcon is removed

interface LinkedInStagerProps {
  profileData: OptimizedProfileData;
  onReset: () => void;
}

// ForwardRef interface for the component's imperative handle
export interface LinkedInStagerRef {
  handleDownloadPdf: () => void;
}

// Helper component to avoid re-renders of static parts inside the main component
interface StagingCardProps {
  title: string;
  content: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  characterCountInfo?: {
    current: number;
    max: number;
    className?: string;
  };
  copyContent?: string;
  copyLabel?: string;
  className?: string;
  // helpText?: string; // helpText prop is no longer needed
}

const StagingCard: React.FC<StagingCardProps> = ({
  title,
  content,
  isActive,
  onClick,
  characterCountInfo,
  copyContent,
  copyLabel,
  className,
  // helpText, // helpText is no longer used
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col gap-2 p-4 mb-3 rounded-lg cursor-pointer
        transition-all duration-200 ease-in-out
        ${isActive ? 'bg-orange-800 bg-opacity-40 border-amber-500 shadow-md shadow-amber-500/30' : 'bg-slate-700 bg-opacity-40 border-orange-600 hover:bg-slate-600 hover:bg-opacity-50'}
        border border-opacity-60
        ${className}
      `}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center">
          <h3 className={`font-semibold text-lg ${isActive ? 'text-white text-glow' : 'text-amber-200'}`}>{title}</h3>
          {/* {helpText && <HelpIcon text={helpText} className="ml-2" />} Removed HelpIcon */}
        </div>
        {copyContent && (
          <CopyButton
            textToCopy={copyContent}
            label={copyLabel}
            className="px-2 py-1 text-xs bg-orange-600 hover:bg-orange-700 hover:shadow-md hover:shadow-orange-500/50"
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking copy button
          />
        )}
      </div>
      <div className={`text-sm ${isActive ? 'text-amber-100' : 'text-amber-300'}`}>
        {content}
      </div>
      {characterCountInfo && (
        <CharacterCounter {...characterCountInfo} className="mt-1" />
      )}
    </div>
  );
};

export const LinkedInStager = forwardRef<LinkedInStagerRef, LinkedInStagerProps>(({ profileData, onReset }, ref) => {
  const LINKEDIN_CONFIG = PLATFORMS.LINKEDIN;
  const [activeSection, setActiveSection] = useState<'headline' | 'about' | 'experience' | 'skills' | number>('headline');
  const [selectedHeadline, setSelectedHeadline] = useState<string>(profileData.headline_options[0] || '');

  const handleDownloadPdf = useCallback(() => {
    let markdownContent = `# Job Profile Lab Optimization Report\n\n`; // Updated name
    markdownContent += `## Platform: ${LINKEDIN_CONFIG.name}\n\n`;

    markdownContent += `### General Guide\n*${LINKEDIN_CONFIG.guide_text.general}*\n\n`;

    markdownContent += `## Headlines\n*${LINKEDIN_CONFIG.guide_text.headline_options}*\n`;
    profileData.headline_options.forEach((h, i) => {
      markdownContent += `- **Option ${i + 1}:** ${h}\n`;
    });
    markdownContent += `\n**Selected Headline:** ${selectedHeadline}\n`;
    markdownContent += `**Character Count:** ${selectedHeadline.length}/${LINKEDIN_CONFIG.fields.headline.max}\n\n`;

    markdownContent += `## About Section\n*${LINKEDIN_CONFIG.guide_text.about_section}*\n`;
    markdownContent += `\`\`\`\n${profileData.about_section}\n\`\`\`\n`; // Use code block for multi-line text
    markdownContent += `**Character Count:** ${profileData.about_section.length}/${LINKEDIN_CONFIG.fields.about.max}\n\n`;

    markdownContent += `## Experience\n*${LINKEDIN_CONFIG.guide_text.experience}*\n`;
    profileData.experience.forEach((job, index) => {
      markdownContent += `\n### Job ${index + 1}: ${job.title} at ${job.company}\n`;
      markdownContent += `*${LINKEDIN_CONFIG.guide_text.experience_item}*\n`;
      markdownContent += `- **Company:** ${job.company}\n`;
      markdownContent += `- **Title:** ${job.title}\n`;
      markdownContent += `- **Dates:** ${job.dates}\n`;
      markdownContent += `- **Description:**\n\`\`\`\n${job.description}\n\`\`\`\n`;
      markdownContent += `**Description Character Count:** ${job.description.length}/${LINKEDIN_CONFIG.fields.experience_description.max}\n`;
    });
    markdownContent += `\n## Skills\n*${LINKEDIN_CONFIG.guide_text.skills}*\n`;
    markdownContent += `- ${profileData.skills.join(', ')}\n`;
    markdownContent += `**Skills Count:** ${profileData.skills.length}/${LINKEDIN_CONFIG.fields.skills_count.max}\n\n`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized_profile_plan.md'; // Changed filename for broader applicability
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Downloading a structured Markdown (.md) file! This text-based format is great for reference and easy copy-pasting into editors. For rich text editing, use "Copy All Optimizations" to paste directly into your word processor.');
  }, [profileData, selectedHeadline, LINKEDIN_CONFIG]);

  const handleCopyAllOptimizations = useCallback(async () => {
    let allContent = `Job Profile Lab - All Optimized Content\n\n`; // Updated name

    allContent += `## Selected Headline\n`;
    allContent += `${selectedHeadline}\n\n`;

    allContent += `## About Section\n`;
    allContent += `${profileData.about_section}\n\n`;

    allContent += `## Experience\n`;
    profileData.experience.forEach((job, index) => {
      allContent += `\n### ${job.title} at ${job.company}\n`;
      allContent += `*Dates: ${job.dates}*\n`;
      allContent += `${job.description}\n`;
    });
    allContent += `\n`;

    allContent += `## Skills\n`;
    allContent += `${profileData.skills.join(', ')}\n\n`;

    try {
      await navigator.clipboard.writeText(allContent);
      alert('All optimized content copied! Paste into your favorite editor.');
    } catch (err) {
      console.error('Failed to copy all content: ', err);
      alert('Failed to copy all content. Please try again or copy sections individually.');
    }
  }, [profileData, selectedHeadline]);


  // Expose the handleDownloadPdf function to the parent component via ref
  useImperativeHandle(ref, () => ({
    handleDownloadPdf,
  }));

  const getActiveGuideText = useCallback(() => {
    if (activeSection === 'headline') {
      return profileData.quick_guide.headline || LINKEDIN_CONFIG.guide_text.headline_options;
    } else if (activeSection === 'about') {
      return profileData.quick_guide.about || LINKEDIN_CONFIG.guide_text.about_section;
    } else if (activeSection === 'skills') {
      return profileData.quick_guide.skills || LINKEDIN_CONFIG.guide_text.skills;
    } else if (typeof activeSection === 'number' && profileData.experience[activeSection]) {
      return profileData.quick_guide.experience || LINKEDIN_CONFIG.guide_text.experience_item;
    }
    return profileData.quick_guide.general || LINKEDIN_CONFIG.guide_text.general || "Select a section on the left to see specific guidance.";
  }, [activeSection, profileData.quick_guide, LINKEDIN_CONFIG.guide_text]);


  return (
    <div className="w-full max-w-7xl flex flex-col items-center">
      {/* Moved general actions to Header component */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Left Column: Sections List */}
        <Card className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-1 border-b border-orange-700 pb-3">
            <h2 className="text-2xl font-bold text-orange-50 text-glow">Job Site Profile Sections</h2>
          </div>
          <p className="text-amber-300 mb-6">Optimized for platforms like LinkedIn, Indeed, Glassdoor, and similar.</p>


          {/* Header Card */}
          <StagingCard
            title="Header & Headline"
            content={<p className="truncate">{selectedHeadline || 'Select a headline option'}</p>}
            isActive={activeSection === 'headline'}
            onClick={() => setActiveSection('headline')}
            copyContent={selectedHeadline}
            copyLabel="COPY SELECTED"
            characterCountInfo={{
              current: selectedHeadline.length,
              max: LINKEDIN_CONFIG.fields.headline.max,
            }}
            // helpText={profileData.quick_guide.headline || LINKEDIN_CONFIG.guide_text.headline_options} // helpText removed
          />

          {/* About Section Card */}
          <StagingCard
            title="About Section"
            content={<p className="truncate">{profileData.about_section}</p>}
            isActive={activeSection === 'about'}
            onClick={() => setActiveSection('about')}
            copyContent={profileData.about_section}
            characterCountInfo={{
              current: profileData.about_section.length,
              max: LINKEDIN_CONFIG.fields.about.max,
            }}
            // helpText={profileData.quick_guide.about || LINKEDIN_CONFIG.guide_text.about_section} // helpText removed
          />

          {/* Experience Sections */}
          <div className="flex justify-between items-center mt-4 mb-4 border-b border-orange-700 pb-2">
            <h3 className="text-xl font-semibold text-orange-50 text-glow">Experience</h3>
            {/* Removed HelpIcon */}
          </div>

          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar"> {/* Added custom scrollbar class */}
            {profileData.experience.map((job, index) => (
              <StagingCard
                key={`exp-${index}`}
                title={`${job.title} at ${job.company}`}
                content={<p className="truncate">{job.description}</p>}
                isActive={activeSection === index}
                onClick={() => setActiveSection(index)}
                copyContent={`Title: ${job.title}\nCompany: ${job.company}\nDates: ${job.dates}\nDescription:\n${job.description}`}
                copyLabel="COPY JOB DETAILS"
                className="!pr-28" // Adjust padding for longer copy button text
                // helpText={profileData.quick_guide.experience || LINKEDIN_CONFIG.guide_text.experience_item} // helpText removed
              />
            ))}
          </div>


          {/* Skills Section Card */}
          <StagingCard
            title="Skills"
            content={<p className="truncate">{profileData.skills.join(', ')}</p>}
            isActive={activeSection === 'skills'}
            onClick={() => setActiveSection('skills')}
            copyContent={profileData.skills.join(', ')}
            characterCountInfo={{
              current: profileData.skills.length, // Display count of skills rather than character length of joined string
              max: LINKEDIN_CONFIG.fields.skills_count.max,
              className: 'mt-1',
            }}
            copyLabel="COPY ALL SKILLS"
            // helpText={profileData.quick_guide.skills || LINKEDIN_CONFIG.guide_text.skills} // helpText removed
          />
        </Card>

        {/* Right Column: Active Section Details & Explanation */}
        <Card className="p-6 h-full flex flex-col">
          {/* Quick Guide Tip - Moved to top */}
          <div className="mb-6 pb-6 border-b border-orange-700">
            <h3 className="text-xl font-semibold mb-3 text-orange-50 text-glow">Quick Guide Tip</h3>
            <p className="text-amber-300 text-base leading-relaxed">
              {getActiveGuideText()}
            </p>
          </div>

          {/* New "Copy All Optimizations" button */}
          <p className="text-amber-200 text-sm mb-3">
            <strong className="text-orange-300">Pro Tip:</strong> Click here to copy all optimized profile data (headline, about, experience, skills) into your clipboard, ready for pasting into any document editor.
          </p>
          <Button
            onClick={handleCopyAllOptimizations}
            className="w-full py-2 mb-6 text-base bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 hover:shadow-lg hover:shadow-orange-500/50"
            aria-label="Copy all optimized content"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
              <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
            </svg>
            Copy All Optimizations
          </Button>

          <h2 className="text-2xl font-bold mb-6 text-orange-50 text-glow border-b border-orange-700 pb-3">
            {activeSection === 'headline' ? 'Header & Headline Options' :
             activeSection === 'about' ? 'About Section Details' :
             activeSection === 'skills' ? 'Skills Details' :
             typeof activeSection === 'number' ? `Experience: ${profileData.experience[activeSection].title}` :
             'Profile Overview'}
          </h2>

          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
            {activeSection === 'headline' && (
              <div className="mb-6">
                <p className="text-amber-300 mb-4 text-sm">Select your preferred headline option:</p>
                {profileData.headline_options.map((headline, index) => (
                  <div key={index} className="flex items-center mb-3 p-3 bg-slate-700 bg-opacity-50 rounded-lg border border-orange-600">
                    <input
                      type="radio"
                      id={`headline-${index}`}
                      name="headline-option"
                      value={headline}
                      checked={selectedHeadline === headline}
                      onChange={() => setSelectedHeadline(headline)}
                      className="form-radio h-5 w-5 text-orange-500 bg-slate-800 border-orange-600 focus:ring-amber-400"
                    />
                    <label htmlFor={`headline-${index}`} className="ml-3 text-amber-100 flex-grow cursor-pointer">
                      <span className="block font-medium">{headline}</span>
                      <CharacterCounter
                        current={headline.length}
                        max={LINKEDIN_CONFIG.fields.headline.max}
                        className="text-xs"
                      />
                    </label>
                  </div>
                ))}
                <div className="mt-6 flex justify-end">
                  <CopyButton textToCopy={selectedHeadline} label="COPY SELECTED HEADLINE" className="w-auto px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700" />
                </div>
              </div>
            )}

            {activeSection === 'about' && (
              <div className="mb-6">
                <textarea
                  className="w-full h-48 p-4 bg-slate-700 border border-orange-600 rounded-lg text-amber-50 focus:outline-none resize-y"
                  value={profileData.about_section}
                  readOnly
                  aria-label="About section content"
                ></textarea>
                <div className="flex justify-between items-center mt-3">
                  <CharacterCounter
                    current={profileData.about_section.length}
                    max={LINKEDIN_CONFIG.fields.about.max}
                  />
                  <CopyButton textToCopy={profileData.about_section} label="COPY ABOUT SECTION" />
                </div>
              </div>
            )}

            {typeof activeSection === 'number' && profileData.experience[activeSection] && (
              <div className="mb-6">
                <h4 className="text-xl font-bold text-amber-100 mb-3">{profileData.experience[activeSection].title}</h4>
                <p className="text-amber-300 mb-2">Company: {profileData.experience[activeSection].company}</p>
                <p className="text-amber-300 mb-4">Dates: {profileData.experience[activeSection].dates}</p>
                <textarea
                  className="w-full h-64 p-4 bg-slate-700 border border-orange-600 rounded-lg text-amber-50 focus:outline-none resize-y"
                  value={profileData.experience[activeSection].description}
                  readOnly
                  aria-label="Experience description content"
                ></textarea>
                <div className="flex justify-between items-center mt-3">
                  <CharacterCounter
                    current={profileData.experience[activeSection].description.length}
                    max={LINKEDIN_CONFIG.fields.experience_description.max}
                  />
                  <CopyButton textToCopy={profileData.experience[activeSection].description} label="COPY DESCRIPTION" />
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="bg-orange-600 px-3 py-1 rounded-full text-sm text-white font-medium shadow-md shadow-orange-500/30">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <CharacterCounter
                    current={profileData.skills.length}
                    max={LINKEDIN_CONFIG.fields.skills_count.max}
                  />
                  <CopyButton textToCopy={profileData.skills.join(', ')} label="COPY ALL SKILLS" />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
});

// Removed manual style injection, custom scrollbar styles are now in index.html