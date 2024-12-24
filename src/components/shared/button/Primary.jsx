import { Button } from 'antd';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Primary = ({ className, onClick, children, ...props }) => {
  return (
    <Button
      className={twMerge('bg-primary', className)}
      type="primary"
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Primary;
