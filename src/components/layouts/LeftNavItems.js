'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CloseOutlined } from '@ant-design/icons';
import { Drawer, Input } from 'antd';
import Image from 'next/image';
import { PATH_ABOUT, PATH_ALL_PRODUCT, PATH_CONTACT, PATH_HOME } from '@/helpers/Slugs';
import {
  GET_ALL_PRODUCTS,
  GET_NAVBAR_CATEGORIES_MEN,
  GET_NAVBAR_CATEGORIES_NEW_ARRIVAL,
  GET_NAVBAR_CATEGORIES_WOMEN,
} from '@/helpers/apiUrl';
import axios from 'axios';
import { debounce } from 'next/dist/server/utils';
import assets from '@/assets/asset';

const { Search } = Input;
// const { Option } = Select;

const LeftNavItems = ({ toggleMenu }) => {
  const pathname = usePathname();

  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    if (toggleMenu) {
      toggleMenu();
    }
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const isActiveRoute = (route) => {
    if (route === pathname) {
      return 'bg-primary text-white rounded-sm';
    }

    return 'hover:bg-primary hover:text-white rounded-sm';
  };

  // new arrial API
  const [categories, setCategories] = useState([]);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);

  // new arrival
  useEffect(() => {
    (async function fetchNewArrivalCategories() {
      try {
        const response = await axios.get(GET_NAVBAR_CATEGORIES_NEW_ARRIVAL);
        setCategories(response?.data);
      } catch (error) {
        console.error('Error fetching new arrival categories:', error);
      }
    })();
  }, []);

  // men
  useEffect(() => {
    (async function fetchMenCategories() {
      try {
        const response = await axios.get(GET_NAVBAR_CATEGORIES_MEN);
        setMen(response?.data);
      } catch (error) {
        console.error('Error fetching new arrival categories:', error);
      }
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // women
  useEffect(() => {
    (async function fetchWomenCategories() {
      try {
        const response = await axios.get(GET_NAVBAR_CATEGORIES_WOMEN);
        setWomen(response?.data);
      } catch (error) {
        console.error('Error fetching new arrival categories:', error);
      }
    })();
  }, []);

  // global search
  const fetchProducts = async (query) => {
    try {
      const response = await axios.get(`${GET_ALL_PRODUCTS}`, {
        params: { searchKey: query }, // Pass query as a parameter
      });
      console.log('Products----', response.data.content);
      return response.data.content; // Adjust based on your API response structure
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  };

  const handleSearch = debounce(async (value) => {
    if (value) {
      const results = await fetchProducts(value);
      setSearchResults(results);
      setIsDropdownVisible(true);
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  }, 300);

  const onInputChange = (e) => {
    handleSearch(e.target.value);
  };

  // open category dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSubDropdownToggle = () => {
    setIsSubDropdownOpen(!isSubDropdownOpen);
  };

  return (
    <div className="bg-white border-b">
      <div className="container py-2 hidden justify-between items-center lg:flex text-base text-secondary-dark dark:text-secondary-light w-full">
        <ul className="justify-between items-center lg:flex ">
          <div className="cursor-pointer">
            <p
              onClick={showDrawer}
              className="font-medium transition-all duration-200 hover:text-[#FF69B4]"
            >
              All Categories
            </p>
            {/* all categories drawer */}
            <Drawer
              placement="left"
              closable={false}
              title={
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span>All Categories</span>
                  <CloseOutlined
                    onClick={onClose}
                    style={{ fontSize: '16px', cursor: 'pointer', color: '#000' }}
                  />
                </div>
              }
              onClose={onClose}
              open={open}
            >
              <div>
                <Image width={50} height={50} src={assets?.logo} alt="Logo" />
              </div>
              <div className="mt-8">
                <ul>
                  <li className="max-lg:mb-2 lg:ml-2 cursor-pointer transition-all relative group">
                    <div
                      onClick={handleDropdownToggle}
                      className="inline-block w-full h-full p-2 text-lg text-black font-normal group"
                    >
                      New-Arrivals
                      <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
                    </div>

                    {/* Dropdown content */}

                    <div
                      className={`dropdownText transition-all duration-500 overflow-hidden ${
                        isDropdownOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {Array.isArray(categories) && categories.length > 0 && (
                        <ul className="ml-4">
                          {categories.map((_sub_category, j) => (
                            <li key={j} className="mb-4" onClick={handleDropdownToggle}>
                              <Link
                                href={PATH_ALL_PRODUCT}
                                title={_sub_category.name}
                                className="font-bold text-black hover:text-gray-700 transition-all"
                              >
                                {_sub_category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>

                  {/* <li
                    className={`max-lg:mb-2 lg:ml-2 cursor-pointer transition-all `}
                  >
                    <Link
                      href={PATH_ALL_PRODUCT}
                      title="Men"
                      onClick={handleToggle}
                      className="inline-block w-full h-full p-2 text-black font-normal group"
                    >
                      Men
                      <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
                    </Link>
                  </li> */}

                  <li className="max-lg:mb-2 lg:ml-2 cursor-pointer transition-all relative group">
                    <div
                      onClick={handleSubDropdownToggle}
                      className="inline-block w-full h-full p-2 text-lg text-black font-normal group"
                    >
                      Women
                      <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
                    </div>
                    <div
                      className={`dropdownText transition-all duration-500 overflow-hidden ${
                        isSubDropdownOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {Array.isArray(women) && women.length > 0 && (
                        <ul className="ml-4">
                          {women.map((_sub_category, j) => (
                            <li key={j} className="mb-4" onClick={handleSubDropdownToggle}>
                              <Link
                                href={PATH_ALL_PRODUCT}
                                title={_sub_category.name}
                                className="font-bold text-black hover:text-gray-700 transition-all"
                              >
                                {_sub_category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* </Link> */}
                  </li>
                  <li
                    className={`max-lg:mb-2 lg:ml-2 cursor-pointer transition-all `}
                    // ${isActiveRoute(nav.path)}
                  >
                    <Link
                      href={PATH_ABOUT}
                      title="About"
                      // onClick={handleToggle}
                      className="inline-block w-full h-full p-2 text-lg text-black font-normal group"
                    >
                      About
                      <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
                    </Link>
                  </li>
                  <li
                    className={`max-lg:mb-2 lg:ml-2 cursor-pointer transition-all `}
                    // ${isActiveRoute(nav.path)}
                  >
                    <Link
                      href={PATH_CONTACT}
                      title="Contact"
                      // onClick={handleToggle}
                      className="inline-block w-full h-full p-2 text-lg text-black font-normal group"
                    >
                      Contact
                      <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* <div className="absolute bottom-5">
                <a href="#">
                  <p className="px-4 py-1 border w-fit rounded-md">Logout</p>
                </a>
              </div> */}
            </Drawer>
          </div>

          <div className="h-4 w-[5px] bg-gray-600 mx-2"></div>
          <li className="max-lg:mb-2 lg:ml-2 cursor-pointer transition-all relative group">
            <Link
              href={PATH_HOME}
              title="Home"
              className="inline-block w-full h-full p-2 text-black font-normal group"
            >
              Home
              <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
            </Link>
          </li>
          <li className="max-lg:mb-2 lg:ml-2 cursor-pointer transition-all relative group">
            <Link
              href={PATH_ALL_PRODUCT}
              title="New Arrival"
              className="inline-block w-full h-full p-2 text-black font-normal group"
            >
              New Arrival
              <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
            </Link>
            {/* Subcategories dropdown */}
            {Array.isArray(categories) && categories.length > 0 && (
              <div className="absolute min-h-[18rem] flex justify-between w-full border border-black overflow-hidden rounded-md left-0 top-full bg-white ml-[-5rem] shadow-md min-w-[50rem] opacity-0 transform scale-95 translate-y-2 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-10">
                <div className="grid grid-cols-3 gap-4 w-full px-4 py-1">
                  {categories.map((_sub_category, j) => (
                    <div key={j} className="col-span-1 h-fit">
                      <div className="mb-2 mt-2">
                        <Link
                          href={PATH_ALL_PRODUCT}
                          title={_sub_category.name}
                          className="font-bold text-black hover:text-gray-700 transition-all"
                        >
                          {_sub_category.name}
                        </Link>
                      </div>
                      {_sub_category.subCategoryList && (
                        <ul className="space-y-2">
                          {_sub_category.subCategoryList.map((_subsubcategory, k) => (
                            <li key={k} className="hover:bg-gray-200">
                              <Link
                                href={PATH_ALL_PRODUCT}
                                title={_subsubcategory.name}
                                className="text-black hover:text-gray-700 transition-all w-full"
                              >
                                {_subsubcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                {categories?.[0] && (
                  <div className="w-[35rem]">
                    <img
                      className="w-full h-full"
                      src={categories[0].subCategoryList?.[0]?.image || categories[0].image || ''}
                      alt={
                        categories[0].subCategoryList?.[0]?.image
                          ? 'Subcategory Image'
                          : 'No Image Available'
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </li>
          <li className="max-lg:mb-2 lg:ml-2 cursor-pointer transition-all relative group">
            <Link
              href={PATH_ALL_PRODUCT}
              title="Women"
              className="inline-block w-full h-full p-2 text-black font-normal group"
            >
              Women
              <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
            </Link>
            {/* Subcategories dropdown */}
            {Array.isArray(women) && women.length > 0 && (
              <div className="absolute min-h-[18rem] flex justify-between w-full border border-black overflow-hidden rounded-md left-0 top-full bg-white ml-[-5rem] shadow-md min-w-[50rem] opacity-0 transform scale-95 translate-y-2 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-10">
                <div className="grid grid-cols-3 gap-4 w-full px-4 py-1">
                  {women.map((_sub_category, j) => (
                    <div key={j} className="col-span-1 h-fit">
                      <div className="mb-2 mt-2">
                        <Link
                          href={PATH_ALL_PRODUCT}
                          title={_sub_category.name}
                          className="font-bold text-black hover:text-gray-700 transition-all"
                        >
                          {_sub_category.name}
                        </Link>
                      </div>
                      {_sub_category.subCategoryList && (
                        <ul className="space-y-2">
                          {_sub_category.subCategoryList.map((_subsubcategory, k) => (
                            <li key={k} className="hover:bg-gray-200">
                              <Link
                                href={PATH_ALL_PRODUCT}
                                title={_subsubcategory.name}
                                className="text-black hover:text-gray-700 transition-all w-full"
                              >
                                {_subsubcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                {women?.[0] && (
                  <div className="w-[35rem]">
                    <img
                      className="w-full h-full"
                      src={women[0].subCategoryList?.[0]?.image || women[0].image || ''}
                      alt={
                        women[0].subCategoryList?.[0]?.image
                          ? 'Subcategory Image'
                          : 'No Image Available'
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </li>

          <li className="max-lg:mb-2 lg:ml-2 cursor-pointer transition-all relative group">
            <Link
              href={PATH_ABOUT}
              title="About"
              className="inline-block w-full h-full p-2 text-black font-normal group"
            >
              About
              <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
            </Link>
          </li>
          <li className="max-lg:mb-2 lg:ml-2 cursor-pointer transition-all relative group">
            <Link
              href={PATH_CONTACT}
              title="Contact"
              className="inline-block w-full h-full p-2 text-black font-normal group"
            >
              Contact
              <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
            </Link>
          </li>
        </ul>

        <div className="bg-white relative">
          <Search
            placeholder="Search prodct by name, category, or sub-category"
            onChange={onInputChange}
            allowClear
            size="large"
            style={{
              width: 500,
            }}
          />
          {isDropdownVisible && searchResults.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute w-full top-12 rounded border p-2 bg-white max-h-40 overflow-y-auto shadow-lg z-10"
            >
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product?.slug}`} // Use the correct URL format here
                >
                  <div className="py-1 px-2 hover:bg-gray-100 cursor-pointer">{product.name}</div>
                </Link>
              ))}
            </div>
          )}
          {/* Message for no results */}
          {isDropdownVisible && searchResults.length === 0 && (
            <div
              ref={dropdownRef}
              className="absolute w-full top-12 rounded border p-2 bg-white shadow-lg z-10"
            >
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftNavItems;
