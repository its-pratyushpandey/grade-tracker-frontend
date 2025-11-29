import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export function Loading({ size = 'md', fullScreen = false }: LoadingProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const spinner = (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizes[size]}`} />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
        <div className="text-center">
          <div className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizes['lg']} mx-auto`} />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return spinner;
}
