import React from 'react';

interface CardProps {
  // FIX: Made children optional to work around a type-checking issue where it was incorrectly reported as missing.
  children?: React.ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`h-full w-full rounded-lg border border-white/10 bg-white/5 p-4 shadow-inner-glow ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;