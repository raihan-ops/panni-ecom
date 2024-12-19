import { Input } from 'antd';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Text = ({ value, className, placeholder = '', ...props }) => {
  return (
    <>
      <Input
        className={twMerge('h-[44px]', className)}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
};

export default Text;
