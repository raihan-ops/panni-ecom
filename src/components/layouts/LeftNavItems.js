'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { MAIN_NAV_ITEMS } from '@/helpers/Navs';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;
// const { Option } = Select;

const LeftNavItems = ({ toggleMenu }) => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const pathname = usePathname();

  const handleToggle = () => {
    if (toggleMenu) {
      toggleMenu();
    }
  };

  // const selectBefore = (
  //   <Select defaultValue="All">
  //     <Option value="All">All</Option>
  //     <Option value="Mens">Mens</Option>
  //     <Option value="Womens">Women's</Option>
  //   </Select>
  // );

  const isActiveRoute = (route) => {
    if (route === pathname) {
      return 'bg-primary text-white rounded-sm';
    }

    return 'hover:bg-primary hover:text-white rounded-sm';
  };

  return (
    <div className="bg-white border-b">
      <div className="container py-2 hidden justify-between items-center lg:flex text-base text-secondary-dark dark:text-secondary-light w-full">
        <ul className="justify-between items-center lg:flex ">
          <div className="cursor-pointer">
            <p className="font-medium transition-all duration-200 hover:text-red-700">
              All Categories
            </p>
          </div>
          <div className="h-4 w-[5px] bg-gray-600 mx-2"></div>
          {MAIN_NAV_ITEMS.map((nav, i) => (
            <li
              key={i}
              className={`max-lg:mb-2 lg:ml-2 cursor-pointer transition-all `}
              // ${isActiveRoute(nav.path)}
            >
              <Link
                href={nav.path}
                title={nav.title}
                onClick={handleToggle}
                className="inline-block w-full h-full p-2 text-black font-normal group"
              >
                {nav.displayName}
                <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="bg-white">
          {/* <Search
            addonBefore={selectBefore}
            placeholder="Input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          /> */}
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftNavItems;
