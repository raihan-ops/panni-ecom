'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SizeDropdown from './SizeDropdown';
import CategoryDropdown from './CategoryDropdown';
import ColorsDropdown from './ColorsDropdwon';
import ProductItem from '../Common/ProductItem';
import axios from 'axios';
import { GET_ALL_PRODUCT_COLORS, GET_ALL_PRODUCTS, GET_ALL_SUB_CATEGORIES } from '@/helpers/apiUrl';

const AllProductsPAge = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [sortOption, setSortOption] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  useEffect(() => {
    (async function fetchSubcategories() {
      try {
        const response = await axios.get(`${GET_ALL_SUB_CATEGORIES}?size=100`);
        setCategories(response.data.content);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    })();

    // Fetch all products initially
    fetchProducts();
    fetchColors();
  }, []);

  const fetchProducts = async (categoryIds = []) => {
    try {
      const categoryQuery =
        categoryIds.length > 0 ? `&subCategoryIds=${categoryIds.join(',')}` : '';
      const colorQuery = activeColor ? `&color=${encodeURIComponent(activeColor)}` : '';

      const sortQuery = `&sort=${sortOption}`;
      const response = await axios.get(
        `${GET_ALL_PRODUCTS}?size=10${categoryQuery}${sortQuery}${colorQuery}`,
      );
      setProducts(response.data?.content);
      setTotalProducts(response.data?.totalElements);
      setPageTotal(response.data?.content?.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await axios.get(`${GET_ALL_PRODUCT_COLORS}`);
      setColors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch products whenever sortOption changes
  useEffect(() => {
    fetchProducts(selectedCategoryIds, sortOption);
  }, [sortOption, selectedCategoryIds, activeColor]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryIds(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Remove if already selected
          : [...prev, categoryId], // Add if not selected
    );
  };

  const handleSortChange = ({ key }) => {
    setSortOption(key); // Update the sort option state
  };

  const handelColorCode = (code) => {
    setActiveColor(code);
  };

  const items = [
    {
      label: 'Oldest',
      value: 'oldest',
      key: 'oldest',
    },
    {
      label: 'Newest',
      value: 'newest',
      key: 'newest',
    },
    {
      label: 'Price Low to High',
      value: 'price-low-to-high',
      key: 'price-low-to-high',
    },
    {
      label: 'Price High to Low',
      value: 'price-high-to-low',
      key: 'price-high-to-low',
    },
    {
      label: 'A to Z',
      value: 'a-z',
      key: 'a-z',
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
                    <CategoryDropdown
                      categories={categories}
                      onCategoryClick={handleCategoryClick}
                    />

                    {/* // <!-- size box --> */}
                    <SizeDropdown />

                    {/* // <!-- color box --> */}
                    {/* <ColorsDropdwon /> */}
                    <ColorsDropdown colors={colors} onColorClick={handelColorCode} />
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
                          items: items.map((item) => ({
                            ...item,
                            onClick: () => handleSortChange(item),
                          })),
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
                        Showing{' '}
                        <span className="text-dark">
                          {pageTotal} of {totalProducts}
                        </span>{' '}
                        Products
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {products.map((item, key) => (
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
