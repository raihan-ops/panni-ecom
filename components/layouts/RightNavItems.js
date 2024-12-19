'use client';
import React, { useState } from 'react';
import { Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;
const selectBefore = (
  <Select defaultValue="All">
    <Option value="All">All</Option>
    <Option value="Mens">Mens</Option>
  </Select>
);
const RightNavItems = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="container bg-white w-full flex justify-between items-center py-2 ">
      <div>
        <p className='font-semibold text-primary mb-0'>Panni.com</p>
      </div>
      <div>
        <Search
          addonBefore={selectBefore}
          placeholder="Input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
    </div>
  );
};

export default RightNavItems;
