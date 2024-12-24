/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Subtitle({ children, className }) {
  return (
    <Fragment>
      <p className={twMerge('text-neutral font-bold text-2xl', className)}>{children}</p>
    </Fragment>
  );
}
