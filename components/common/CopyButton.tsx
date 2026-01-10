import React, { useState, useCallback } from 'react';
import { ButtonHTMLAttributes } from 'react'; // Import ButtonHTMLAttributes

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  label?: string;
  // Allow passing an onClick handler to the underlying button for external control (e.g., stopping propagation).
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className = '', label = 'COPY', onClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Call the passed onClick handler if it exists
    if (onClick) {
      onClick(event);
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally show an error message to the user
    }
  }, [textToCopy, onClick]);

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center justify-center
        px-3 py-1.5 rounded-md text-sm font-medium
        bg-gradient-to-r from-orange-500 to-amber-600 text-white
        hover:from-orange-600 hover:to-amber-700 hover:shadow-md hover:shadow-orange-500/50
        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-80
        transition-all duration-200 ease-in-out
        ${className}
      `}
    >
      {copied ? 'COPIED!' : label}
    </button>
  );
};