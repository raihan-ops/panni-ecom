import { DownOutlined } from '@ant-design/icons';
import { ConfigProvider, Select } from 'antd';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Primary = ({
  placeholder,
  variant = 'borderless',
  options = [],
  onChange,
  className,
  placeholderColor = '#061837',
  suffixIconEnable = true,
  fontSize = 20,
  ...rest
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorTextPlaceholder: placeholderColor,
            fontSize: fontSize,
            fontWeightStrong: 500,
            optionFontSize: 16,
          },
        },
      }}
    >
      <Select
        placeholder={placeholder}
        variant={variant}
        options={options}
        onChange={onChange}
        className={twMerge('', className)}
        suffixIcon={
          suffixIconEnable ? (
            <DownOutlined
              style={{
                fontSize: 16,
                color: '#061837',
                pointerEvents: 'none',
              }}
            />
          ) : null
        }
        {...rest}
      />
    </ConfigProvider>
  );
};

export default Primary;
