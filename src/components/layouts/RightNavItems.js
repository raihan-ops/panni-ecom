'use client';

import React, { useState } from 'react';

import { Input } from '../shared/input';
import { ShoppingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { LOGIN, SIGN_UP } from '../../helpers/Slugs';

const RightNavItems = () => {
  return (
    <div className=" bg-white w-full py-2 ">
      <div className="container  flex justify-between items-center">
        <div>
          <p className="font-semibold text-primary mb-0">Panni.com</p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/checkout">
            <div className="w-fit h-fit relative ">
              <ShoppingOutlined
                style={{
                  color: 'black',
                  fontSize: '24px',
                }}
              />
              <div className="text-white text-[12px] bg-gray-600 w-5 h-5 flex items-center justify-center text-xs rounded-full absolute -top-[6px] -right-[8px]">
                3
              </div>
            </div>
          </Link>

          <div className="w-fit border flex items-center gap-2 rounded-md overflow-hidden px-3 py-1">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
            </div>
            <div className="flex">
              <Link href={LOGIN}>
                <div className="login group">
                  Login
                  <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
                </div>
              </Link>
              /
              <Link href={SIGN_UP}>
                <div className="login group">
                  Sign-up
                  <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightNavItems;
