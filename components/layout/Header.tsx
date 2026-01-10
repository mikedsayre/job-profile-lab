import React from 'react';
import { Button } from '../common/Button';
import { PLATFORMS } from '../../siteConfig';
import { APP_NAME, TAGLINE, BYLINE, BYLINE_LINK, HEADER_LOGO_PLACEHOLDER_URL } from '../../constants'; // Corrected import path

interface HeaderProps {
  appName: string;
  tagline: string;
  byline: string;
  bylineLink: string;
  onResetApp: () => void;
  onDownloadPdf?: () => void; // Optional, only available when profile is optimized
  onToggleTutorial: () => void; // Function to toggle tutorial page visibility
  isTutorialActive: boolean; // Indicates if the tutorial page is currently active
}

export const Header: React.FC<HeaderProps> = ({
  onResetApp,
  onDownloadPdf,
  onToggleTutorial,
  isTutorialActive,
}) => {

  const headerGuideText = PLATFORMS.LINKEDIN.guide_text.header || "This is the main navigation bar. Here you can start a new optimization, download your current plan as a PDF, or access a tutorial/help guide.";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900 bg-opacity-90 backdrop-blur-md border-b border-orange-800 shadow-xl py-3 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center md:justify-between max-w-7xl mx-auto">
        {/* Logo and App Title */}
        <div className="flex items-center min-w-0 pr-2 mb-3 md:mb-0"> {/* Added flex for logo and text alignment */}
          <img
            src={HEADER_LOGO_PLACEHOLDER_URL}
            alt={`${APP_NAME} Logo`}
            className="h-[4em] w-[4em] mr-2 flex-shrink-0"
            aria-hidden="true"
          />
          <div className="flex flex-col items-center md:items-start"> {/* Kept flex-col for title/tagline stack */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 leading-tight text-glow text-center md:text-left">
              {APP_NAME}
            </h1>
            <p className="text-sm md:text-base text-amber-300 mt-0.5 font-medium whitespace-nowrap overflow-hidden text-ellipsis text-center md:text-left">
              {TAGLINE}
            </p>
            <a href={BYLINE_LINK} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-orange-400 hover:text-orange-300 transition-colors duration-200 mt-0.5 text-center md:text-left">
              {BYLINE}
            </a>
          </div>
        </div>

        {/* Navigation - Always Visible, now responsive */}
        <nav className="flex flex-row space-x-2 md:space-x-4 w-full md:w-auto justify-center">
          <Button onClick={onResetApp} className="flex items-center text-xs md:text-sm px-2 py-1 md:px-3 md:py-2 bg-orange-700 hover:bg-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7m9 0V3a1 1 0 00-1-1H6a1 1 0 00-1 1v7" />
            </svg>
            <span className="hidden md:inline">New Opt.</span>
            <span className="inline md:hidden">New</span>
          </Button>
          {onDownloadPdf && (
            <Button onClick={onDownloadPdf} className="flex items-center text-xs md:text-sm px-2 py-1 md:px-3 md:py-2 bg-orange-600 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l3-3m-3 3l-3-3m2-8h7a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
              </svg>
              <span className="hidden md:inline">Download Plan</span>
              <span className="inline md:hidden">Plan</span>
            </Button>
          )}
          <Button
            onClick={onToggleTutorial}
            className={`flex items-center text-xs md:text-sm px-2 py-1 md:px-3 md:py-2 ${isTutorialActive ? 'bg-amber-700' : 'bg-orange-600 hover:bg-orange-700'}`}
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9.247a3 3 0 112.528 2.528L10.582 16H11a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2h4.582l-2.043 2.043a3 3 0 01-.528.528z" />
             </svg>
             <span>Help</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};