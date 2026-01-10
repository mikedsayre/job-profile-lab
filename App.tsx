import React, { useState, useCallback, useRef } from 'react';
import { OptimizedProfileData } from './types';
import { generateProfileData } from './services/geminiService';
import { LinkedInStager } from './components/LinkedInStager';
import { Button } from './components/common/Button';
import { Spinner } from './components/common/Spinner';
import { Header } from './components/layout/Header';
import { PLATFORMS } from './siteConfig';
import { TutorialPage } from './components/TutorialPage'; // Import new TutorialPage

function App() {
  const [resumeText, setResumeText] = useState<string>('');
  const [optimizedProfile, setOptimizedProfile] = useState<OptimizedProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showTutorialPage, setShowTutorialPage] = useState<boolean>(false); // New state for tutorial page

  // Ref to LinkedInStager's download function
  const linkedInStagerRef = useRef<{ handleDownloadPdf: () => void }>(null);

  const handleOptimizeResume = useCallback(async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text to optimize.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setOptimizedProfile(null);

    try {
      const data = await generateProfileData(resumeText);
      setOptimizedProfile(data);
    } catch (err: any) {
      console.error("Failed to optimize resume:", err);
      setError(err.message || "Failed to optimize resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [resumeText]);

  const handleResetApp = useCallback(() => {
    setResumeText('');
    setOptimizedProfile(null);
    setError(null);
    setIsLoading(false);
    setShowTutorialPage(false); // Ensure tutorial is closed on reset
  }, []);

  const triggerPdfDownload = useCallback(() => {
    if (linkedInStagerRef.current && optimizedProfile) {
      linkedInStagerRef.current.handleDownloadPdf();
    } else if (!optimizedProfile) {
      alert("Please optimize your profile first to download the plan.");
    }
  }, [optimizedProfile]);

  const toggleTutorialPage = useCallback(() => {
    setShowTutorialPage((prev) => !prev);
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 to-gray-950 text-slate-100 font-sans">
      <Header
        appName="Job Profile Lab"
        tagline="The Science of Getting Hired"
        byline="by Swan Lake Digital"
        bylineLink="https://swanlakedigital.com"
        onResetApp={handleResetApp}
        onDownloadPdf={optimizedProfile ? triggerPdfDownload : undefined}
        onToggleTutorial={toggleTutorialPage}
        isTutorialActive={showTutorialPage}
      />

      <main className="flex-grow w-full px-4 pt-48 pb-10 flex flex-col items-center"> {/* Adjusted pt- for fixed header */}
        {showTutorialPage ? (
          <TutorialPage onBackToApp={toggleTutorialPage} />
        ) : !optimizedProfile ? (
          <div className="w-full max-w-3xl bg-slate-800 bg-opacity-70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-2xl border border-orange-700 glow-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 text-glow text-center">Paste Your Resume</h2>
            <p className="text-amber-200 mb-6 text-center text-sm md:text-base">
              To get started, simply paste the raw text content of your resume into the box below. Our AI will then analyze, optimize, and structure it for maximum impact on job sites.
            </p>
            <textarea
              className="w-full h-64 p-4 mb-6 bg-slate-700 border border-orange-600 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-300 resize-y"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              disabled={isLoading}
              aria-label="Resume text input"
            ></textarea>

            <Button
              onClick={handleOptimizeResume}
              disabled={isLoading}
              className="w-full py-3 text-lg bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 hover:shadow-lg hover:shadow-orange-500/50"
              aria-label="Optimize Profile button"
            >
              {isLoading ? <Spinner /> : 'Optimize Profile'}
            </Button>

            {error && (
              <p className="mt-4 text-red-400 text-center" role="alert">{error}</p>
            )}
            <p className="mt-6 text-sm text-amber-300 text-center">
              Your data is processed securely and not stored.
            </p>
          </div>
        ) : (
          <LinkedInStager profileData={optimizedProfile} onReset={handleResetApp} ref={linkedInStagerRef} />
        )}
      </main>

      <footer className="w-full py-6 text-amber-400 text-sm text-center border-t border-orange-800 mt-auto">
        <div className="flex items-center justify-center">
          <img
            src="https://via.placeholder.com/64x64/f97316/ffffff?text=JP"
            alt="Job Profile Lab Logo"
            className="h-[4em] w-[4em] mr-2"
            aria-hidden="true"
          />
          &copy; {new Date().getFullYear()} Job Profile Lab by <a href="https://swanlakedigital.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors duration-200 ml-1">Swan Lake Digital</a>. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;