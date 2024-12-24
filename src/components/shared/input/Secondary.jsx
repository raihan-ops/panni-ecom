import { ConfigProvider, Input } from 'antd';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Secondary = ({
  placeholder,
  variant = 'borderless',
  onChange,
  className,
  placeholderColor = '#061837',
  ...rest
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorTextPlaceholder: placeholderColor,
            fontWeightStrong: 500,
          },
        },
      }}
    >
      <Input
        placeholder={placeholder}
        variant={variant}
        onChange={onChange}
        className={twMerge('', className)}
        {...rest}
      />
    </ConfigProvider>
  );
};

export default Secondary;
