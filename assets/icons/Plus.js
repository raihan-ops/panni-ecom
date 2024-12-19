import React from 'react';

const Plus = ({ width = 10, height = 10, color = '#061837' }) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.35714 4.35714V0.5H5.64286V4.35714H9.5V5.64286H5.64286V9.5H4.35714V5.64286H0.5V4.35714H4.35714Z"
          fill={color}
          fillOpacity="0.4"
        />
      </svg>
    </div>
  );
};

export default Plus;
