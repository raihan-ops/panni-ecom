'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { MAIN_NAV_ITEMS } from '@/helpers/Navs';
import { Input } from '../shared/input';
import { ShoppingOutlined } from '@ant-design/icons';
const LeftNavItems = ({ toggleMenu }) => {
  const pathname = usePathname();

  const handleToggle = () => {
    if (toggleMenu) {
      toggleMenu();
    }
  };

  const isActiveRoute = (route) => {
    if (route === pathname) {
      return 'bg-primary text-white rounded-sm';
    }

    return 'hover:bg-primary hover:text-white rounded-sm';
  };

  return (
    <div className='bg-primary'>
      <div className="container  hidden justify-between items-center lg:flex text-base text-secondary-dark dark:text-secondary-light w-full">
        <div>
          <p className="text-white">All Categories</p>
        </div>

        <ul className="justify-center items-center lg:flex ">
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
                className="inline-block w-full h-full p-2 text-white font-medium"
              >
                {nav.displayName}
              </Link>
            </li>
          ))}
        </ul>

        <ShoppingOutlined
          style={{
            color: 'white',
            fontSize: '24px',
          }}
        />
      </div>
    </div>
  );
};

export default LeftNavItems;
