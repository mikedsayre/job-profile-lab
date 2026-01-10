import React, { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Handle clicks outside the modal content
  // Fix: Change event type from native MouseEvent to React.MouseEvent for compatibility with React's onClick
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8 bg-black bg-opacity-70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleClickOutside} // Click on overlay closes modal
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md md:max-w-lg lg:max-w-xl bg-slate-800 bg-opacity-95 rounded-xl shadow-2xl border border-orange-700 p-6 md:p-8 transform transition-all duration-300 scale-95 md:scale-100 ease-out max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <div className="flex justify-between items-center border-b border-orange-700 pb-4 mb-4">
          <h2 id="modal-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 text-glow">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-orange-400 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full p-1 transition-colors duration-200"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};