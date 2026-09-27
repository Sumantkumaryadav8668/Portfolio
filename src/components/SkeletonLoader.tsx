import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 animate-pulse space-y-8">
      <div className="h-8 bg-brand-card rounded-lg w-1/4"></div>
      <div className="h-4 bg-brand-card rounded-lg w-2/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-48 bg-brand-card rounded-xl"></div>
        <div className="h-48 bg-brand-card rounded-xl"></div>
        <div className="h-48 bg-brand-card rounded-xl"></div>
      </div>
    </div>
  );
};
