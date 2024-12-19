'use client';
import React from 'react';
import { CaretRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Radio, Slider, Rate, Collapse } from 'antd';
import { Input } from '../input';
import { Icons } from '@/assets/icons';

const SingleSelectCheckboxFilter = ({ brands, selected, onChange, title = 'Brand' }) => {
  const handleChange = (brandName) => {
    onChange(brandName === selected ? null : brandName);
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <div className="mt-3 transition-transform duration-300 ease-in-out transform">
          {isActive ? (
            <MinusOutlined className="rotate-0" />
          ) : (
            <PlusOutlined className="rotate-90" />
          )}
        </div>
      )}
      className="bg-white shadow-md"
      expandIconPosition="end"
      items={[
        {
          key: '1',
          label: <h2 className="text-black font-medium text-lg">{title}</h2>,
          children: (
            <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <Input.Text
                className={'w-full h-[36px] rounded-lg mb-4'}
                placeholder={`Search ${title}`}
                prefix={<Icons.GSearch className="h-4 w-4" />}
              />
              {brands.map((brand) => (
                <div key={brand.name} className="flex justify-between items-center mb-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 cursor-pointer"
                      checked={selected === brand.name}
                      onChange={() => handleChange(brand.name)}
                    />
                    <span className="ml-2">{brand.name}</span>
                  </label>
                  <span className="text-[#16B38C] text-sm font-bold">{brand.count}</span>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
};

export default SingleSelectCheckboxFilter;
