'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import assets from '@/assets/asset';
import Image from 'next/image';
import RelatedProducts from '@/components/pages/Common/RelatedProducts';

const ProductDetails = () => {
  const params = useParams();
  const { slug } = params;

  const images = [
    { src: assets.Tv, alt: 'Image 1' },
    { src: assets.laptop, alt: 'Image 2' },
    { src: assets.joystick, alt: 'Image 3' },
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const tabs = [
    {
      id: 'tabOne',
      title: 'Description',
    },
    {
      id: 'tabTwo',
      title: 'Additional Information',
    },
  ];
  const [activeTab, setActiveTab] = useState('tabOne');
  return (
    <div>
      <section className="overflow-hidden relative pb-20 pt-12">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7 xl:gap-16">
            <div className="lg:max-w-[570px] w-full">
              {/* Main Image Section */}
              <div className="lg:min-h-[512px] border rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7 relative flex items-center justify-center">
                <div>
                  <button
                    aria-label="button for zoom"
                    className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-6 right-4 lg:right-6 z-50"
                  >
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.11493 1.14581L9.16665 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665L1.14581 9.11493C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581ZM16.765 2.64893C15.823 2.52227 14.5812 2.52081 12.8333 2.52081C12.4536 2.52081 12.1458 2.21301 12.1458 1.83331C12.1458 1.45362 12.4536 1.14581 12.8333 1.14581L12.885 1.14581C14.5696 1.1458 15.904 1.14579 16.9483 1.28619C18.023 1.43068 18.8928 1.73512 19.5788 2.42112C20.2648 3.10712 20.5693 3.97699 20.7138 5.05171C20.8542 6.09599 20.8542 7.43032 20.8541 9.11494V9.16665C20.8541 9.54634 20.5463 9.85415 20.1666 9.85415C19.787 9.85415 19.4791 9.54634 19.4791 9.16665C19.4791 7.41873 19.4777 6.17695 19.351 5.23492C19.227 4.31268 18.9945 3.78133 18.6066 3.39339C18.2186 3.00545 17.6873 2.77292 16.765 2.64893ZM1.83331 12.1458C2.21301 12.1458 2.52081 12.4536 2.52081 12.8333C2.52081 14.5812 2.52227 15.823 2.64893 16.765C2.77292 17.6873 3.00545 18.2186 3.39339 18.6066C3.78133 18.9945 4.31268 19.227 5.23492 19.351C6.17695 19.4777 7.41873 19.4791 9.16665 19.4791C9.54634 19.4791 9.85415 19.787 9.85415 20.1666C9.85415 20.5463 9.54634 20.8541 9.16665 20.8541H9.11494C7.43032 20.8542 6.09599 20.8542 5.05171 20.7138C3.97699 20.5693 3.10712 20.2648 2.42112 19.5788C1.73512 18.8928 1.43068 18.023 1.28619 16.9483C1.14579 15.904 1.1458 14.5696 1.14581 12.885L1.14581 12.8333C1.14581 12.4536 1.45362 12.1458 1.83331 12.1458ZM20.1666 12.1458C20.5463 12.1458 20.8541 12.4536 20.8541 12.8333V12.885C20.8542 14.5696 20.8542 15.904 20.7138 16.9483C20.5693 18.023 20.2648 18.8928 19.5788 19.5788C18.8928 20.2648 18.023 20.5693 16.9483 20.7138C15.904 20.8542 14.5696 20.8542 12.885 20.8541H12.8333C12.4536 20.8541 12.1458 20.5463 12.1458 20.1666C12.1458 19.787 12.4536 19.4791 12.8333 19.4791C14.5812 19.4791 15.823 19.4777 16.765 19.351C17.6873 19.227 18.2186 18.9945 18.6066 18.6066C18.9945 18.2186 19.227 17.6873 19.351 16.765C19.4777 15.823 19.4791 14.5812 19.4791 12.8333C19.4791 12.4536 19.787 12.1458 20.1666 12.1458Z"
                      />
                    </svg>
                  </button>
                  <Image src={selectedImage.src} alt={selectedImage.alt} width={400} height={400} />
                </div>
              </div>

              {/* Variant Image Section */}
              <div className="flex flex-wrap sm:flex-nowrap gap-4 mt-6">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`flex items-center justify-center w-14 sm:w-24 h-14 sm:h-24 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border ${
                      selectedImage.src === image.src ? 'border-black' : 'hover:border-blue-800'
                    }`}
                  >
                    <Image width={50} height={50} src={image.src} alt={image.alt} />
                  </button>
                ))}
              </div>
            </div>

            {/* <!-- product content --> */}
            <div className="max-w-[539px] w-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
                  {/* {product.title} */}
                  {slug}
                </h2>

                <div className="inline-flex font-medium text-custom-sm text-white bg-blue rounded py-0.5 px-2.5">
                  30% OFF
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_375_9221)">
                      <path
                        d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
                        fill="#22AD5C"
                      />
                      <path
                        d="M12.6875 7.09374L8.9688 10.7187L7.2813 9.06249C7.00005 8.78124 6.56255 8.81249 6.2813 9.06249C6.00005 9.34374 6.0313 9.78124 6.2813 10.0625L8.2813 12C8.4688 12.1875 8.7188 12.2812 8.9688 12.2812C9.2188 12.2812 9.4688 12.1875 9.6563 12L13.6875 8.12499C13.9688 7.84374 13.9688 7.40624 13.6875 7.12499C13.4063 6.84374 12.9688 6.84374 12.6875 7.09374Z"
                        fill="#22AD5C"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_375_9221">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="text-green"> In Stock </span>
                </div>
              </div>

              <h3 className="font-medium text-custom-1 mb-4">
                <span className="text-sm sm:text-base text-dark">
                  {/* Price: ${product.price} */}
                  Price: ৳100{' '}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  {' '}
                  {/* ${product.discountedPrice}{" "} */}
                  ৳60{' '}
                </span>
              </h3>

              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                      fill="#3C50E0"
                    />
                  </svg>
                  Free delivery available
                </li>

                <li className="flex items-center gap-2.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                      fill="#3C50E0"
                    />
                  </svg>
                  Sales 30% Off Use Code: PROMO30
                </li>
              </ul>

              {/* <form onSubmit={(e) => e.preventDefault()}> */}
              <form>
                <div className="flex flex-col gap-4 border-y border-gray-3 mt-7 mb-9 py-9">
                  {/* <!-- details item --> */}
                  <div className="flex items-center gap-4">
                    <div className="min-w-[65px]">
                      <h4 className="font-medium text-dark">Color:</h4>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {/* {colors.map((color, key) => ( */}
                      <label
                        //   key={key}
                        //   htmlFor={color}
                        className="cursor-pointer select-none flex items-center"
                      >
                        <div className="relative">
                          <input
                            type="radio"
                            name="color"
                            //   id={color}
                            className="sr-only"
                            //   onChange={() => setActiveColor(color)}
                          />
                          <div
                            //   className={`flex items-center justify-center w-5.5 h-5.5 rounded-full ${
                            //     activeColor === color && "border"
                            //   }`}
                            className="flex items-center justify-center w-5.5 h-5.5 rounded-full"
                            //   style={{ borderColor: `${color}` }}
                          >
                            <span
                              className="block w-3 h-3 rounded-full"
                              // style={{ backgroundColor: `${color}` }}
                            ></span>
                          </div>
                        </div>
                      </label>
                      {/* ))} */}
                    </div>
                  </div>

                  {/* // <!-- details item --> */}
                  <div className="flex items-center gap-4">
                    <div className="min-w-[65px]">
                      <h4 className="font-medium text-dark">Type:</h4>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* {types.map((item, key) => ( */}
                      <label
                        //   key={key}
                        //   htmlFor={item.id}
                        className="flex cursor-pointer select-none items-center"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="storage"
                            //   id={item.id}
                            className="sr-only"
                            //   onChange={() => setType(item.id)}
                          />

                          {/*  */}
                          <div
                            className="mr-2 flex h-4 w-4 items-center justify-center rounded border"
                            //   className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                            //     type === item.id
                            //       ? "border-blue bg-blue"
                            //       : "border-gray-4"
                            //   } `}
                          >
                            <span
                            // className={
                            //   type === item.id
                            //     ? "opacity-100"
                            //     : "opacity-0"
                            // }
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="4"
                                  y="4.00006"
                                  width="16"
                                  height="16"
                                  rx="4"
                                  fill="#3C50E0"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16.3103 9.25104C16.471 9.41178 16.5612 9.62978 16.5612 9.85707C16.5612 10.0844 16.471 10.3024 16.3103 10.4631L12.0243 14.7491C11.8635 14.9098 11.6455 15.0001 11.4182 15.0001C11.191 15.0001 10.973 14.9098 10.8122 14.7491L8.24062 12.1775C8.08448 12.0158 7.99808 11.7993 8.00003 11.5745C8.00199 11.3498 8.09214 11.1348 8.25107 10.9759C8.41 10.8169 8.62499 10.7268 8.84975 10.7248C9.0745 10.7229 9.29103 10.8093 9.4527 10.9654L11.4182 12.931L15.0982 9.25104C15.2589 9.09034 15.4769 9.00006 15.7042 9.00006C15.9315 9.00006 16.1495 9.09034 16.3103 9.25104Z"
                                  fill="white"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        {/* {item.title} */}
                        Lorem ipsum dolor sit.
                      </label>
                      {/* ))} */}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center rounded-md border border-gray-3">
                    <button
                      aria-label="button for remove product"
                      className="flex items-center justify-center w-10 h-10 ease-out duration-200 hover:text-blue"
                      //   onClick={() =>
                      //     quantity > 1 && setQuantity(quantity - 1)
                      //   }
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

                    <span className="flex items-center justify-center w-12 h-10 border-x border-gray-4">
                      {/* {quantity} */}2
                    </span>

                    <button
                      //   onClick={() => setQuantity(quantity + 1)}
                      aria-label="button for add product"
                      className="flex items-center justify-center w-10 h-10 ease-out duration-200 hover:text-blue"
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

                  <a
                    href="#"
                    className="inline-flex font-medium text-white bg-blue py-2 px-5  rounded-md ease-out duration-200 bg-blue-500 hover:bg-blue-700"
                  >
                    Add-to-cart
                  </a>

                  <a
                    href="#"
                    className="inline-flex font-medium text-white bg-blue py-2 px-5 rounded-md ease-out duration-200 bg-blue-500 hover:bg-blue-700"
                  >
                    Buy Now
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* description */}
      <section className="overflow-hidden bg-gray-100 py-20 mb-16">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* tab header start */}
          <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12 py-4 px-4 sm:px-6">
            {tabs.map((item, key) => (
              <button
                key={key}
                onClick={() => setActiveTab(item.id)}
                className={`font-medium lg:text-lg ease-out duration-200 hover:text-black relative before:h-[1px] before:bg-gray-600 before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full 
                                    ${
                                      activeTab === item.id
                                        ? 'text-gray-800 before:w-full'
                                        : 'text-dark before:w-0'
                                    }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          {/*  tab header end  */}

          {/*  tab content start  */}
          {/*  tab content one start  */}
          <div>
            <div
              className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10  ${activeTab === 'tabOne' ? 'block' : 'hidden'}`}
            >
              <div className="rounded-md even:bg-gray-1 py-4 px-4 sm:px-5">
                <h2 className="font-medium text-2xl text-dark mb-7">Specifications:</h2>

                <p className="mb-6">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                  an unknown printer took a galley of type and scrambled it to make a type specimen
                  book.
                </p>
                <p className="mb-6">
                  It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s.
                </p>
                <p>
                  with the release of Letraset sheets containing Lorem Ipsum passages, and more
                  recently with desktop publishing software like Aldus PageMaker including versions.
                </p>
              </div>
            </div>
          </div>
          {/*  tab content one end - */}

          {/*  tab content two start  */}
          <div>
            <div
              className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10 ${
                activeTab === 'tabTwo' ? 'block' : 'hidden'
              }`}
            >
              {/*  info item  */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Brand</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">Apple</p>
                </div>
              </div>

              {/*  info item  */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Model</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">iPhone 14 Plus</p>
                </div>
              </div>

              {/* info item  */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Display Size</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">6.7 inches</p>
                </div>
              </div>

              {/*  info item  */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Display Type</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">
                    Super Retina XDR OLED, HDR10, Dolby Vision, 800 nits (HBM), 1200 nits (peak)
                  </p>
                </div>
              </div>

              {/*  info item  */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Display Resolution</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">1284 x 2778 pixels, 19.5:9 ratio</p>
                </div>
              </div>

              {/*  info item  */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Chipset</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">Apple A15 Bionic (5 nm)</p>
                </div>
              </div>

              {/* <!-- info item --> */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Memory</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">
                    128GB 6GB RAM | 256GB 6GB RAM | 512GB 6GB RAM
                  </p>
                </div>
              </div>

              {/* <!-- info item --> */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Main Camera</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">
                    12MP + 12MP | 4K@24/25/30/60fps, stereo sound rec.
                  </p>
                </div>
              </div>

              {/* <!-- info item --> */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Selfie Camera</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">
                    12 MP | 4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS
                  </p>
                </div>
              </div>

              {/* <!-- info item --> */}
              <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                <div className="max-w-[450px] min-w-[140px] w-full">
                  <p className="text-sm sm:text-base text-dark">Battery Info</p>
                </div>
                <div className="w-full">
                  <p className="text-sm sm:text-base text-dark">
                    Li-Ion 4323 mAh, non-removable | 15W wireless (MagSafe), 7.5W wireless (Qi)
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*  tab content two end  */}
          {/* tab content end  */}
        </div>

        <RelatedProducts />
      </section>
    </div>
  );
};

export default ProductDetails;
