import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const Primary = ({ presets, className, text }) => {
  const presetClassesMap = {
    green: 'bg-success-lite text-success',
    neutral: 'bg-neutral-extra-lite text-text-neutral-lite',
    white: 'bg-white text-secondary',
    yellow: 'bg-yellow-extra-lite text-neutral-lite',
  };
  const defaultClasses = 'bg-white text-neutral-lite';
  const presetClasses = presetClassesMap[presets] || defaultClasses;
  const combinedClasses = twMerge('text-md font-semibold rounded px-3 py-1 ', presetClasses, className);
  return <span className={combinedClasses}>{text}</span>;
};

Primary.propTypes = {
  presets: PropTypes.oneOf(['green', 'neutral', 'white', 'yellow']),
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Primary.defaultProps = {
  presets: 'white',
  className: '',
};

export default Primary;
