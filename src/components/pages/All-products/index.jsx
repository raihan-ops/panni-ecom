'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import { Drawer, Dropdown, Space, Pagination } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SizeDropdown from './SizeDropdown';
import CategoryDropdown from './CategoryDropdown';
import ColorsDropdown from './ColorsDropdwon';
import ProductItem from '../Common/ProductItem';
import axios from 'axios';
import { GET_ALL_PRODUCT_COLORS, GET_ALL_PRODUCTS, GET_ALL_SUB_CATEGORIES } from '@/helpers/apiUrl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PATH_ALL_PRODUCT } from '@/helpers/Slugs';
import LoadingSuspense from '@/components/loader/LoadingSuspense';

const AllProductsPAge = ({ params }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [size, setSize] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);

  const [productLoader, setProductLoader] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const searchKey = searchParams.get('searchKey') || '';

  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [searchKey]);

  // Modify fetchProducts to handle pagination and loading states properly
  const fetchProducts = async (page = 1) => {
    try {
      setProductLoader(true);

      const queryParams = new URLSearchParams({
        size: 10,
        page: page - 1,
        sort: sortOption,
        ...(selectedCategoryIds.length > 0 && { subCategoryIds: selectedCategoryIds.join(',') }),
        ...(activeColor && { color: activeColor }),
        ...(size && { productSize: size }),
        ...(searchKey && { searchKey }),
        ...(params.offerId && { offerId: params.offerId }),
      });

      const response = await axios.get(`${GET_ALL_PRODUCTS}?${queryParams}`);

      setProducts(response.data?.content);
      setTotalProducts(response.data?.totalElements);
      setPageTotal(response.data?.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProductLoader(false);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await axios.get(`${GET_ALL_PRODUCT_COLORS}`);
      setColors(response.data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1);
  }, [sortOption, selectedCategoryIds, activeColor, size, searchKey]);

  const handleCategoryClick = (categoryId) => {
    // Update selected categories
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    );

    // Remove searchKey from URL
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete('searchKey');

    // Update URL without searchKey
    const newUrl = `${PATH_ALL_PRODUCT}${currentParams.toString() ? `?${currentParams.toString()}` : ''}`;
    router.push(newUrl);
  };

  const handleSortChange = ({ key }) => {
    setSortOption(key); // Update the sort option state
  };

  const handelColorCode = (code) => {
    setActiveColor(code);
  };

  const handleSizeChange = (size) => {
    setSize(size);
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setSelectedCategoryIds([]);
    setActiveColor(null);
    setSize('');
    setSortOption('newest');
    // Remove searchKey from URL
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete('searchKey');

    // Update URL without searchKey
    const newUrl = `${PATH_ALL_PRODUCT}${currentParams.toString() ? `?${currentParams.toString()}` : ''}`;
    router.push(newUrl);
  };

  // Load more products function
  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
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

  // filter drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  if (productLoader) {
    return <LoadingSuspense />;
  }
  return (
    <>
      <div className="container">
        <Breadcrumb title={'Explore All Products'} pages={['shop', '/', 'All-Products']} />
        <section className="relative my-10 ">
          <div className=" mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex gap-7">
              {/* Sidebar */}
              <div className="hidden lg:block w-[30%]">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-6">
                    {/* <!-- filter box --> */}
                    <div className="bg-gray-100 shadow-1 rounded-lg py-4 px-5">
                      <div className="flex items-center justify-between">
                        <p>Filters:</p>
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={handleClearFilters}
                        >
                          Clear All
                        </button>
                      </div>
                    </div>

                    {/* <!-- category box --> */}
                    <CategoryDropdown
                      categories={categories}
                      onCategoryClick={handleCategoryClick}
                      selectedCategoryIds={selectedCategoryIds}
                    />

                    {/* // <!-- size box --> */}
                    <SizeDropdown onSizeClick={handleSizeChange} />

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
                    <div className="flex items-center justify-between gap-4 w-full cursor-pointer">
                      {/* <Select defaultValue={"sort"} className="w-40" options={options} /> */}
                      <Dropdown
                        menu={{
                          items: items?.map((item) => ({
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
                      <p className="hidden md:block">
                        Showing{' '}
                        <span className="text-dark">
                          {currentPage > pageTotal ? 0 : (currentPage - 1) * 10 + 1} -{' '}
                          {Math.min(currentPage * 10, totalProducts)} of {totalProducts}
                        </span>{' '}
                        Products
                      </p>
                      <div
                        className="block md:hidden border px-4 py-1 rounded-md"
                        type="primary"
                        onClick={showDrawer}
                      >
                        Filter
                      </div>

                      <Drawer title="Filters" onClose={onClose} open={open}>
                        <div className="flex flex-col gap-6">
                          {/* <!-- category box --> */}
                          <CategoryDropdown
                            categories={categories}
                            onCategoryClick={handleCategoryClick}
                          />
                          {/* // <!-- size box --> */}
                          <SizeDropdown onSizeClick={handleSizeChange} />
                          {/* // <!-- color box --> */}
                          <ColorsDropdown colors={colors} onColorClick={handelColorCode} />
                        </div>
                      </Drawer>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {products?.map((item, key) => (
                    <div key={key}>
                      <Link href={`products/${item?.slug}`}>
                        <ProductItem item={item} />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Ant Design Pagination */}
                <Pagination
                  current={currentPage}
                  pageSize={10}
                  total={totalProducts}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  className="flex justify-center mt-8"
                />

                {/* Show no results message */}
                {products.length === 0 && !productLoader && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No products found matching your filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AllProductsPAge;
