import { twMerge } from 'tailwind-merge';

const Heading = ({ children, className }) => {
  return (
    <>
      <span
        className={twMerge(
          'font-bold text-[30px] sm:text-[32px] lg:text-[52px] text-natural leading-[56px]',
          className,
        )}
      >
        {children}
      </span>
    </>
  );
};

export default Heading;
