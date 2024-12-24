import { Button } from 'antd';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Outline = ({
  className,
  buttonType = 'default',
  onClick,
  children,
  ...props
}) => {
  return (
    <Button
      className={twMerge('uppercase bg-inherit', className)}
      onClick={onClick}
      type={buttonType}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Outline;
