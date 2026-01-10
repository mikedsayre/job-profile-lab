import React from 'react';

interface CharacterCounterProps {
  current: number;
  max: number;
  className?: string;
}

export const CharacterCounter: React.FC<CharacterCounterProps> = ({ current, max, className = '' }) => {
  const isExceeded = current > max;
  return (
    <p className={`
      text-sm font-medium
      ${isExceeded ? 'text-orange-400' : 'text-amber-300'}
      ${className}
    `}>
      {current} / {max}
    </p>
  );
};