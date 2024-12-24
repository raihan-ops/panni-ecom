import React from 'react';

const PolygonPlay = ({ className }) => {
  return (
    <svg
      className={className}
      width="32"
      height="36"
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_1092_6238)">
        <path
          d="M7.49596e-08 3.16954C4.15588e-08 0.866071 2.48845 -0.578031 4.48842 0.56481L30.4417 15.3953C32.4572 16.547 32.4572 19.453 30.4417 20.6047L4.48842 35.4352C2.48845 36.578 5.38452e-07 35.1339 5.05051e-07 32.8305L7.49596e-08 3.16954Z"
          fill="#ECF9FF"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_1092_6238"
          x="-12"
          y="-11.835"
          width="55.9533"
          height="59.6699"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1092_6238" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1092_6238"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default PolygonPlay;
