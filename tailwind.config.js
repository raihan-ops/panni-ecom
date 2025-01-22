const { colors } = require('./src/styles/styleVariable');

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.css',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1728px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: colors._primaryColor,
        },
      },
      borderRadius: {
        brand: '8px',
      },
      boxShadow: {
        'brand-light': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'brand-medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const gradientUtilities = Object.entries(theme('backgroundImage')).reduce(
        (acc, [name, value]) => {
          acc[`.text-${name}`] = {
            'background-image': value,
            '-webkit-background-clip': 'text',
            'background-clip': 'text',
            color: 'transparent',
            display: 'inline-block',
          };
          return acc;
        },
        {},
      );
      addUtilities(gradientUtilities, ['responsive', 'hover']);
    },
  ],
};
