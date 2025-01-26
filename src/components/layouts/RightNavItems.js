'use client';

import React, { useEffect, useRef, useState } from 'react';
// import { Input } from '../shared/input';
import { SearchOutlined, ShoppingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {
  LOGIN,
  PATH_HOME,
  PATH_CHECKOUT,
  SIGN_UP,
  PATH_ALL_PRODUCT,
  PATH_ABOUT,
  PATH_CONTACT,
  PATH_TRACK,
} from '@/helpers/Slugs';
import { MAIN_NAV_ITEMS } from '@/helpers/Navs';
import Image from 'next/image';
import { Button, Drawer, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import assets from '@/assets/asset';
import { useAuthContext } from '@/contexts/AuthContextProvider';
import { useGlobalContext } from '@/contexts/GlobalContextProvider';
import { useRouter } from 'next/navigation';
import { debounce } from 'next/dist/server/utils';
import {
  GET_ALL_PRODUCTS,
  GET_NAVBAR_CATEGORIES_NEW_ARRIVAL,
  GET_NAVBAR_CATEGORIES_WOMEN,
} from '@/helpers/apiUrl';
import axios from 'axios';

const { Search } = Input;

const RightNavItems = ({ toggleMenu }) => {
  const router = useRouter();
  const { cart, updateCart, clearCart, getCartItemQuantity } = useGlobalContext();
  const { isLogin, logout, profile } = useAuthContext();

  const handleToggle = () => {
    if (toggleMenu) {
      toggleMenu();
    }
  };

  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  // search
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

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [openSearch, setOpenSearch] = useState(false);
  const [placement, setPlacement] = useState('top');
  const showSearch = () => {
    setOpenSearch(true);
  };
  const onCloseSearch = () => {
    setOpenSearch(false);
  };

  // cart
  const [openCart, setOpenCart] = useState(false);

  const showCartDrawer = () => {
    setOpenCart(true);
  };
  const onCloseCart = () => {
    setOpenCart(false);
  };

  const handleQuantityChange = async (product, operation) => {
    const currentQuantity = getCartItemQuantity(product.id);
    const newQuantity =
      operation === 'increase' ? currentQuantity + 1 : Math.max(currentQuantity - 1, 0);

    if (newQuantity === 0) {
      await updateCart(product, 0);
    } else {
      await updateCart(product, newQuantity);
    }
  };

  // console.log('Cartttt', cart);

  // new arrial API
  const [categories, setCategories] = useState([]);
  // const [men, setMen] = useState([]);
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
  // useEffect(() => {
  //   (async function fetchMenCategories() {
  //     try {
  //       const response = await axios.get(GET_NAVBAR_CATEGORIES_MEN);
  //       setMen(response?.data);
  //     } catch (error) {
  //       console.error('Error fetching new arrival categories:', error);
  //     }
  //   })();
  // }, []);

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSubDropdownToggle = () => {
    setIsSubDropdownOpen(!isSubDropdownOpen);
  };

  return (
    <div className=" bg-white w-full py-2 ">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="md:block lg:hidden">
            <div className="flex flex-col gap-2 cursor-pointer" onClick={showDrawer}>
              <div className="bg-black w-5 h-[2px]"></div>
              <div className="bg-black w-3 h-[2px]"></div>
            </div>
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
              <div className="absolute bottom-5 w-fit border flex items-center gap-2 rounded-md overflow-hidden px-3 py-1">
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
                {isLogin ? (
                  <div className="login group cursor-pointer" onClick={() => logout()}>
                    Logout
                    <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
                  </div>
                ) : (
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
                )}
              </div>
            </Drawer>
          </div>

          <div>
            <Link href={PATH_HOME}>
              <Image src={assets.logo} height={55} width={55} alt="Logo" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-fit h-fit">
            <a className="hidden md:block" href={PATH_TRACK}>
              Track
            </a>
          </div>
          <div className="block md:hidden" onClick={showSearch}>
            <SearchOutlined style={{ fontSize: '18px', marginTop: '6px' }} />
          </div>
          <div>
            <Drawer
              title="Search..."
              placement={placement}
              width={500}
              onClose={onCloseSearch}
              open={openSearch}
            >
              <div className="bg-white relative text-center">
                <Search
                  placeholder="Search product by name, category, or sub-category"
                  onChange={onInputChange}
                  allowClear
                  size="large"
                  style={{ width: 250 }}
                />
                {isDropdownVisible && searchResults.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute w-full top-12 rounded p-2 bg-white max-h-60 overflow-y-auto z-10"
                  >
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product?.slug}`} // Ensure correct URL format
                      >
                        <div className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                          {product.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {isDropdownVisible && searchResults.length === 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute w-full top-12 rounded border p-2 bg-white shadow-lg z-10"
                  >
                    <p className="text-gray-500">No products found</p>
                  </div>
                )}
              </div>
            </Drawer>
          </div>
          {/* <Link href="/checkout"> */}
          <div className="w-fit h-fit relative" onClick={showCartDrawer}>
            <ShoppingOutlined
              style={{
                color: 'black',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            />
            <div className="text-white text-[12px] bg-gray-600 w-5 h-5 flex items-center justify-center text-xs rounded-full absolute -top-[6px] -right-[8px]">
              {cart.invoice.totalProduct}
            </div>
          </div>
          <Drawer title="Cart" onClose={onCloseCart} open={openCart}>
            <div>
              {/* cart items */}
              {cart.cartDetailsList && cart.cartDetailsList.length > 0 ? (
                <div className="mb-12 h-72 overflow-y-auto rounded-lg cartSection">
                  {cart.cartDetailsList.map((item) => (
                    <div
                      key={item.id}
                      className="px-3 py-3 mb-2 bg-white rounded-md flex justify-between items-center shadow-md relative"
                    >
                      <div className="rounded-lg">
                        {item?.product?.images?.length > 0 && (
                          <Image
                            width={120}
                            height={80}
                            src={item?.product?.images[0]?.image}
                            alt="cart-product"
                          />
                        )}
                      </div>
                      <div className="w-80">
                        <p className="line-clamp-2">{item?.product?.name}</p>
                      </div>
                      <div className="flex items-center w-fit rounded-md border border-gray-3">
                        <button
                          aria-label="button for remove product"
                          className="flex items-center justify-center w-6 h-6 ease-out duration-200 hover:text-blue"
                          onClick={() => handleQuantityChange(item.product, 'decrease')}
                        >
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.33301 10.0001C3.33301 9.53984 3.7061 9.16675 4.16634 9.16675H15.833C16.2932 9.16675 16.6663 9.53984 16.6663 10.0001C16.6663 10.4603 16.2932 10.8334 15.833 10.8334H4.16634C3.7061 10.8334 3.33301 10.4603 3.33301 10.0001Z"
                              fill=""
                            />
                          </svg>
                        </button>

                        <span className="flex items-center justify-center w-10 h-6 border-x border-gray-4">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleQuantityChange(item.product, 'increase')}
                          aria-label="button for add product"
                          className="flex items-center justify-center w-6 h-6 ease-out duration-200 hover:text-blue"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.33301 10C3.33301 9.5398 3.7061 9.16671 4.16634 9.16671H15.833C16.2932 9.16671 16.6663 9.5398 16.6663 10C16.6663 10.4603 16.2932 10.8334 15.833 10.8334H4.16634C3.7061 10.8334 3.33301 10.4603 3.33301 10Z"
                              fill=""
                            />
                            <path
                              d="M9.99967 16.6667C9.53944 16.6667 9.16634 16.2936 9.16634 15.8334L9.16634 4.16671C9.16634 3.70647 9.53944 3.33337 9.99967 3.33337C10.4599 3.33337 10.833 3.70647 10.833 4.16671L10.833 15.8334C10.833 16.2936 10.4599 16.6667 9.99967 16.6667Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                      {/* <div>
                        <p className="m-0 p-0 text-sm">Price</p>
                        <p className="text-gray-500 text-sm">৳{product.price * product.quantity}</p>
                      </div> */}
                      <button
                        onClick={() => handleQuantityChange(item.product, 'decrease')}
                        className="w-fit h-fit dbtn bg-red-100 transition-all duration-200 hover:shadow-md p-1 rounded-full -top-1 -right-1"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4"
                        >
                          <path
                            d="M10 11V17"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M14 11V17"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M4 7H20"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mb-10 text-red-500">&quot;no product available in the cart&quot;</p>
              )}
              {/* cart items end*/}

              <div className="p-4 sm:p-7.5">
                <div className="flex flex-col gap-4">
                  <div className="mb-4 border-b pb-5">
                    <div className="flex justify-between items-center text-gray-600">
                      <p className="w-fit">Subtotal:</p>
                      <p className="w-fit">৳{cart.invoice.totalPrice.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between items-center text-gray-600">
                      <p className="w-fit">Shipping fee:</p>
                      <p className="w-fit">৳00.00</p>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <p className="w-fit">Tax:</p>
                      <p className="w-fit">৳00.00</p>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <p className="w-fit">Discount:</p>
                      <p className="w-fit">৳00.00</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="w-fit">Total:</p>
                      <p className="w-fit">৳{cart.invoice.finalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {cart.cartDetailsList && cart.cartDetailsList.length > 0 && (
                <div className="flex gap-3 absolute bottom-5">
                  <button
                    onClick={() => router.push(PATH_CHECKOUT)}
                    className=" mt-2 font-medium text-white bg-black border py-2 px-7 rounded-md ease-out duration-200 hover:bg-white hover:text-black"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="mt-2 font-medium text-black bg-white py-2 px-7 rounded-md ease-out duration-200 hover:bg-gray-300"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </Drawer>
          {/* </Link> */}

          {isLogin && <p>{profile?.firstName}</p>}

          <div className="hidden md:block w-fit border flex items-center gap-2 rounded-md overflow-hidden px-3 py-1">
            {/* <div>
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
            </div> */}
            {isLogin ? (
              <div className="login group cursor-pointer" onClick={() => logout()}>
                Logout
                <div className="bg-gray-600 w-0 h-[2px] transition-all duration-200 group-hover:w-full"></div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightNavItems;
