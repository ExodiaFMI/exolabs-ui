import React from 'react';

interface ProgressProps {
  progress: number;
}

const Progress: React.FC<ProgressProps> = ({ progress }) => (
  <div className="w-full bg-primary rounded-full overflow-hidden">
    <div
      className="bg-info text-xs leading-none h-3 rounded-full transition-all duration-300"
      style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
    />
  </div>
);

export default Progress;
