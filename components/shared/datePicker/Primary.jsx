import { DownOutlined } from '@ant-design/icons';
import { ConfigProvider, DatePicker, Select } from 'antd';
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
  picker = 'year',
  ...rest
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            colorTextPlaceholder: placeholderColor,
            fontWeightStrong: 500,
          },
        },
      }}
    >
      <DatePicker
        placeholder={placeholder}
        picker="year"
        variant={variant}
        options={options}
        onChange={onChange}
        className={twMerge('', className)}
        {...rest}
      />
    </ConfigProvider>
  );
};

export default Primary;
