import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[200px] w-[200px] bg-black">
      <svg
        className="w-16 h-16 text-white animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M4 12a8 8 0 1 1 16 0 8 8 0 1 1-16 0" />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
