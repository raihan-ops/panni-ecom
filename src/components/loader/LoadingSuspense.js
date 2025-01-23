import React from 'react';

const LoadingSuspense = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-full">
      <svg
        className="w-20 h-20 text-primary animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="283"
          strokeDashoffset="75"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default LoadingSuspense;
