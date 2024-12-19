import React, { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

const CardBadge = ({ type = '', children, textColor = 'text-black', className }) => {
  let content;
  if (type === 'priceOff') {
    content = (
      <div className="bg-red rounded-3xl  px-3 pt-[5px] pb-[5px]  flex flex-col items-center justify-center ">
        <span className="text-white text-xxs font-medium">{children}</span>
      </div>
    );
  } else if (type === 'compare') {
    content = (
      <div className="exploreBadge bg-white bg-opacity-40 border-[1.5px] border-white rounded-3xl  px-4 pt-[6px] pb-[6px]  flex flex-col items-center justify-center cursor-default transition-all duration-200 hover:bg-waring-gradient-y1 hover:bg-opacity-100">
        <span className="text-white text-xs font-medium">{children}</span>
      </div>
    );
  } else {
    content = (
      <div
        className={twMerge(
          'bg-opacity-40 border-[34px] rounded-3xl px-4 py-[3px] lg:py-[6px] flex flex-col items-center justify-center ',
          className,
        )}
      >
        <span className={twMerge('text-white text-xs font-medium', textColor)}>{children}</span>
      </div>
    );
  }
  return <Fragment> {content}</Fragment>;
};

export default CardBadge;
