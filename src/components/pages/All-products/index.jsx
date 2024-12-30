'use client';

import React, { useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import SingleGridItem from '../Shop/SingleGridItem';
import SingleListItem from '../Shop/SingleListItem';
// import CustomSelect from "../ShopWithSidebar/CustomSelect";
import shopData from '../Shop/shopData';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import SizeDropdown from './SizeDropdown';
import CategoryDropdown from './CategoryDropdown';
import ColorsDropdown from './ColorsDropdwon';
import ProductItem from '../Common/ProductItem';

const AllProductsPAge = () => {
  // const [productStyle, setProductStyle] = useState("grid");

  const items = [
    {
      label: 'Latest Products',
      value: '0',
      key: '0',
    },
    {
      label: 'Best Selling',
      value: '2',
      key: '1',
    },
    {
      label: 'Old Products',
      value: '2',
      key: '2',
    },
  ];

  const categories = [
    {
      name: 'Desktop',
      products: 10,
      isRefined: true,
    },
    {
      name: 'Laptop',
      products: 12,
      isRefined: false,
    },
    {
      name: 'Monitor',
      products: 30,
      isRefined: false,
    },
    {
      name: 'UPS',
      products: 23,
      isRefined: false,
    },
    {
      name: 'Phone',
      products: 10,
      isRefined: false,
    },
    {
      name: 'Watch',
      products: 13,
      isRefined: false,
    },
  ];

  return (
    <>
      <div className="container">
        <Breadcrumb title={'Explore All Products'} pages={['shop', '/', 'All-Products']} />
        <section className="relative my-10 ">
          <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex gap-7">
              {/* Sidebar */}
              <div className="hidden lg:block w-[30%]">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-6">
                    {/* <!-- filter box --> */}
                    <div className="bg-gray-100 shadow-1 rounded-lg py-4 px-5">
                      <div className="flex items-center justify-between">
                        <p>Filters:</p>
                        <button className="text-blue-600">Clean All</button>
                      </div>
                    </div>

                    {/* <!-- category box --> */}
                    <CategoryDropdown categories={categories} />

                    {/* // <!-- size box --> */}
                    <SizeDropdown />

                    {/* // <!-- color box --> */}
                    {/* <ColorsDropdwon /> */}
                    <ColorsDropdown />
                  </div>
                </form>
              </div>

              {/* Main content */}
              <div className="w-full">
                <div className="rounded-lg bg-gray-100 shadow-1 p-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer">
                      {/* <Select defaultValue={"sort"} className="w-40" options={options} /> */}
                      <Dropdown
                        menu={{
                          items,
                        }}
                        className=" border px-4 py-1 rounded-md"
                        trigger={['click']}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            Sort
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                      <p>
                        Showing <span className="text-dark">9 of 50</span> Products
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div
                                className={`grid ${productStyle === "grid"
                                    ? "grid-cols-3 gap-4"
                                    : "grid-cols-1 gap-6"
                                    }`}
                            >
                                {shopData.map((item) =>
                                    productStyle === "grid" ? (
                                        <SingleGridItem key={item.id} product={item} />
                                    ) : (
                                        <SingleListItem key={item.id} product={item} />
                                    )
                                )}
                            </div> */}
                <div className="grid grid-cols-3 gap-4">
                  {shopData.map((item, key) => (
                    <ProductItem item={item} key={key} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AllProductsPAge;
