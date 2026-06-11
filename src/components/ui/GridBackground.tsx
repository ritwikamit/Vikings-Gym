'use client';

import { memo } from 'react';

interface GridBackgroundProps {
  className?: string;
  opacity?: number;
  size?: number;
  color?: string;
}

export const GridBackground = memo(function GridBackground({
  className = '',
  opacity = 0.03,
  size = 48,
  color = 'rgba(255,255,255,0.03)',
}: GridBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
});
