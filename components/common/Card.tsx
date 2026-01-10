import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-slate-800 bg-opacity-70 backdrop-blur-sm
      rounded-xl shadow-lg border border-orange-700
      p-6
      ${className}
    `}>
      {children}
    </div>
  );
};