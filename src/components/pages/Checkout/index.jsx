'use client';

import React, { useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import { Form, Select } from 'antd';
import Image from 'next/image';
import assets from '@/assets/asset';
import { Checkbox } from 'antd';

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const CheckoutPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 2000, quantity: 1, image: assets.Tv },
    { id: 2, name: 'Product 2', price: 1500, quantity: 1, image: assets.Tv },
    { id: 3, name: 'Product 3', price: 2200, quantity: 1, image: assets.Tv },
  ]);

  const handleDelete = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const handleQuantityChange = (id, operation) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity:
                operation === 'increase' ? product.quantity + 1 : Math.max(product.quantity - 1, 1),
            }
          : product,
      ),
    );
  };

  return (
    <div className="container">
      <Breadcrumb title={'Checkout'} pages={['Checkout']} />

      <section className="overflow-hidden py-10">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7">
            <div className="xl:max-w-[770px] w-full bg-gray-100 rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
              <h1 className="mb-5 text-2xl font-medium">Cart Items</h1>
              {/* cart items */}
              {products && products.length > 0 ? (
                <div className="mb-12 h-44 overflow-y-auto rounded-lg cartSection">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="px-3 py-3 mb-2 bg-white rounded-md flex justify-between items-center shadow-md relative"
                    >
                      <div className="rounded-lg">
                        <Image width={40} height={40} src={product.image} alt="cart-product" />
                      </div>
                      <div className="w-80">
                        <p className="line-clamp-2">{product.name}</p>
                      </div>
                      <div className="flex items-center w-fit rounded-md border border-gray-3">
                        <button
                          aria-label="button for remove product"
                          className="flex items-center justify-center w-6 h-6 ease-out duration-200 hover:text-blue"
                          onClick={() => handleQuantityChange(product.id, 'decrease')}
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
                          {product.quantity}
                        </span>

                        <button
                          onClick={() => handleQuantityChange(product.id, 'increase')}
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
                      <div>
                        <p className="m-0 p-0 text-sm">Price</p>
                        <p className="text-gray-500 text-sm">৳{product.price * product.quantity}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(product.id)}
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

              <form>
                <h1 className="mb-5 text-2xl font-medium">Shipping information</h1>
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="fullname" className="block mb-1 text-sm">
                      Full Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      placeholder="Name"
                      required
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="email" className="block mb-1 text-sm">
                      Email
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="**@email.com"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="phone" className="block mb-1 text-sm">
                      Phone <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter your phone"
                      required
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="subject" className="block mb-1 text-sm">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Select
                      defaultValue="Select City"
                      className="rounded-md border border-gray-3 bg-gray-1 w-full h-10 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                      onChange={handleChange}
                      options={[
                        { label: 'Inside-Dhaka', value: 'Inside-Dhaka' },
                        { label: 'Outside-Dhaka', value: 'Outside-Dhaka' },
                      ]}
                    />
                  </div>
                </div>

                <div className="mb-7 border-b pb-7">
                  <label htmlFor="address" className="block mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    name="address"
                    id="address"
                    rows={2}
                    required
                    placeholder="Type your address"
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="mb-7 mt-5">
                  <label htmlFor="message" className="block mb-2">
                    Note
                  </label>

                  <textarea
                    name="message"
                    id="message"
                    rows={1}
                    placeholder="Type your message"
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                  />
                  <Checkbox checked onChange={onChange}>
                    I agree to the <span className="text-blue-500">Terms and Conditions</span>,{' '}
                    <span className="text-blue-500">Privacy Policy</span>, Shipping & Delivery,
                    Returns & Exchanges
                  </Checkbox>
                </div>
                <button
                  type="submit"
                  className="inline-flex font-medium text-white bg-blue-500 py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-700"
                >
                  Place Order
                </button>
              </form>
            </div>

            <div className="xl:max-w-[370px] w-full h-fit bg-gray-100 rounded-xl shadow-1">
              {/* <div className="py-5 px-4 sm:px-7.5 border-b border-gray-3">
                                <p className="font-medium text-xl text-dark">Contact Information</p>
                            </div> */}

              <div className="p-4 sm:p-7.5">
                <div className="flex flex-col gap-4">
                  <div className="mb-4">
                    <p className="flex items-center gap-4">Shipping Method:</p>
                    <Checkbox
                      className="border w-full my-2 bg-white rounded-md px-4 py-2"
                      onChange={onChange}
                    >
                      Standard Delivery | ৳130
                    </Checkbox>
                  </div>

                  <div className="mb-4">
                    <p className="flex items-center gap-4">Payment method:</p>
                    <Checkbox
                      checked
                      className="border w-full my-2 bg-white rounded-md px-4 py-2"
                      onChange={onChange}
                    >
                      Cash on delivery
                    </Checkbox>
                  </div>

                  <div className="mb-4 border-b pb-5">
                    <div className="flex justify-between items-center text-gray-600">
                      <p className="w-fit">Subtotal:</p>
                      <p className="w-fit">৳2190.00</p>
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
                      <p className="w-fit">৳2190.00</p>
                    </div>
                  </div>

                  <div className="w-full ">
                    <label htmlFor="phone" className="block mb-1 text-sm">
                      Coupon code
                    </label>

                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter your code"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                    />

                    <button
                      type="submit"
                      className="inline-flex mt-2 font-medium text-white bg-blue-500 py-2 px-7 rounded-md ease-out duration-200 hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
