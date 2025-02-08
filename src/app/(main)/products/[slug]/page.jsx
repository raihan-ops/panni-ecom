'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import RelatedProducts from '@/components/pages/Common/RelatedProducts';
import axios from 'axios';
import { GET_PRODUCT_BY_SLUG } from '@/helpers/apiUrl';
import { Icons } from '@/assets/icons';
import LoadingSuspense from '@/components/loader/LoadingSuspense';
import { useGlobalContext } from '@/contexts/GlobalContextProvider';
import { PATH_CHECKOUT } from '@/helpers/Slugs';
import { Toast } from '@/components/shared/toast/Toast';
import Img from '@/components/shared/Img';

const ProductDetails = () => {
  const params = useParams();
  const { slug } = params;

  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { updateCart, getCartItemQuantity, cart, clearCart } = useGlobalContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${GET_PRODUCT_BY_SLUG}/${slug}`);
        setProduct(response.data);
        if (response.data?.colorList?.length) {
          setSelectedColor(response.data.colorList[0]);
        }
        if (response.data?.size) {
          setSelectedSize(response.data.size);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  useEffect(() => {
    if (product?.id) {
      setQuantity(getCartItemQuantity(product.id) > 0 ? getCartItemQuantity(product.id) : 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, cart]);

  const images = product?.images;
  const [selectedImage, setSelectedImage] = useState(images?.length > 0 ? images[0] : null);

  useEffect(() => {
    if (images?.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  // const handleQuantityChange = (action) => {
  //   if (action === 'increase') {
  //     setQuantity((prev) => prev + 1);
  //   } else if (action === 'decrease' && quantity > 1) {
  //     setQuantity((prev) => prev - 1);
  //   }
  // };

  const sendAddToCartEvent = (product, quantity, selectedColor, selectedSize) => {
    if (typeof window !== 'undefined' && product) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          items: [
            {
              item_name: product.name || 'Unknown Product',
              item_id: product.id || 'Unknown ID',
              price: product.price || 0,
              quantity: quantity || 1,
              discount: product.discountPercentage ?? product.productOffer?.discountPercentage ?? 0,
              currency: 'BDT',
              item_size: selectedSize || 'No size',
              item_color: selectedColor?.name || 'No Color',
              item_sku: product.sku || 'Default',
            },
          ],
        },
      });
    }
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity((prev) => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (quantity < 1) {
      Toast('error', 'error', 'Please add quantity first');
      return;
    }
    await updateCart(product, quantity, selectedColor, selectedSize);
    sendAddToCartEvent(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    if (quantity < 1) {
      Toast('error', 'error', 'Please add quantity first');
      return;
    }

    try {
      await clearCart(false);
      await updateCart(product, quantity, selectedColor, selectedSize, true);
      router.push(PATH_CHECKOUT);
    } catch (error) {
      Toast('error', 'Error', 'Failed to process buy now request');
    }
  };

  // datalayer code start
  const sendGtmEvent = (product) => {
    if (typeof window !== 'undefined' && product) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          items: [
            {
              item_name: product.name || 'Unknown Product',
              item_id: product.id || 'Unknown ID',
              price: product.price || 0,
              discount: product.discountPercentage ?? product.productOffer?.discountPercentage ?? 0, // Discount %
              currency: 'BDT',
              // item_category: product.category || 'Unknown',
              item_size: product.size || 'No size',
              // item_color: product.color || 'No Color',
              item_sku: product.sku || 'Default',
            },
          ],
        },
      });
    }
  };

  const hasSentEvent = useRef(false);

  useEffect(() => {
    if (product && !hasSentEvent.current) {
      sendGtmEvent(product);
      hasSentEvent.current = true;
    }
  }, [product]);
  // datalayer code end

  const tabs = [
    {
      id: 'tabOne',
      title: 'Description',
    },
    // {
    //   id: 'tabTwo',
    //   title: 'Additional Information',
    // },
  ];
  const [activeTab, setActiveTab] = useState('tabOne');

  if (loading) {
    return <LoadingSuspense />;
  }
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
                  <img src={selectedImage?.image} alt={product?.name} className="w-full rounded" />
                </div>
              </div>

              {/* Variant Image Section */}
              <div className="flex flex-wrap sm:flex-nowrap gap-4 mt-6">
                {images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`flex items-center justify-center w-14 sm:w-24 h-14 sm:h-24 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border ${
                      selectedImage?.image === image?.image
                        ? 'border-black'
                        : 'hover:border-blue-800'
                    }`}
                  >
                    <Img className="w-full h-full" src={image.image} alt={product.name} />
                  </button>
                ))}
              </div>
            </div>

            {/* <!-- product content --> */}
            <div className="max-w-[539px] w-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
                  {product?.name}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-5 mb-4">
                <div className="flex items-center gap-2">
                  {product?.quantity > 1 ? <Icons.InStock /> : <Icons.OutOfStock />}

                  <span className="text-green">
                    {' '}
                    {product?.quantity > 1 ? 'In Stock' : 'Out Of Stock'}
                    {/*({product?.quantity})*/}
                  </span>
                </div>
              </div>

              <h3 className="font-medium text-custom-1 mb-4">
                <span className="flex items-center gap-2 font-medium text-sm">
                  {product?.discountPercentage > 0 ? (
                    <div>
                      <span className="text-[#E66EAA] text-lg">
                        {' '}
                        ৳{(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                      &nbsp;
                      <span className="text-gray-400 line-through">৳{product.price}</span>
                    </div>
                  ) : product?.productOffer && product.productOffer?.discountPercentage > 0 ? (
                    <>
                      <span className="text-[#E66EAA] text-lg">
                        ৳
                        {(
                          product.price *
                          (1 - product.productOffer?.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through">৳{product.price}</span>
                    </>
                  ) : (
                    <span className="text-[#E66EAA] text-lg">৳{product?.price}</span>
                  )}
                </span>
              </h3>

              {/* <form onSubmit={(e) => e.preventDefault()}> */}
              <form>
                <div className="flex flex-col gap-4 border-y border-gray-3 mt-7 mb-9 py-9">
                  {/* <!-- details item --> */}
                  <div className="flex items-center gap-4">
                    <div className="min-w-[65px]">
                      <h4 className="font-medium text-dark">Color:</h4>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {product?.colorList?.map((color, key) => (
                        <label
                          key={key}
                          htmlFor={color.code}
                          className="cursor-pointer select-none flex items-center"
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name="color"
                              id={color.code}
                              className="sr-only"
                              checked={selectedColor?.code === color.code}
                              onChange={() => setSelectedColor(color)}
                            />
                            <div
                              className={`flex items-center justify-center w-5.5 h-5.5 rounded-full border ${
                                selectedColor?.code === color.code ? 'border-4' : 'border'
                              }`}
                              style={{
                                borderColor: `${color.code.startsWith('#') ? color.code : `#${color.code}`}`,
                              }}
                            >
                              <span
                                className="block w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: `${color.code.startsWith('#') ? color.code : `#${color.code}`}`,
                                }}
                              ></span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* // <!-- details item --> */}
                  <div className="flex items-center gap-4">
                    <div className="min-w-[65px]">
                      <h4 className="font-medium text-dark">Size:</h4>
                    </div>

                    <div className="flex items-center text-md font-bold text-[#E66EAA] gap-4">
                      {product?.size}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center rounded-md border border-gray-3">
                    <button
                      aria-label="decrease quantity"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityChange('decrease');
                      }}
                      className="flex items-center justify-center w-6 md:w-10 h-10 ease-out duration-200 hover:text-blue"
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
                      {quantity}
                    </span>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityChange('increase');
                      }}
                      aria-label="increase quantity"
                      className="flex items-center justify-center w-6 md:w-10 h-10 ease-out duration-200 hover:text-blue"
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

                  <button
                    onClick={handleAddToCart}
                    className="inline-flex font-medium text-white bg-blue px-[4px] py-[11px] text-sm text-nowrap md:text-lg md:py-[6.5px] md:px-5 rounded-md ease-out duration-200 bg-black border hover:bg-white hover:text-black"
                  >
                    Add-to-cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="inline-flex font-medium text-black bg-blue border bg-white px-[4px] py-[11px] text-sm text-nowrap md:text-lg md:py-[6.5px] md:px-5 rounded-md ease-out duration-200 bg-blue-500 hover:bg-black hover:text-white"
                  >
                    Buy Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* description */}
      <section className="overflow-hidden bg-gray-100 py-6 md:py-20 mb-16">
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
              className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-5 md:mt-10  ${activeTab === 'tabOne' ? 'block' : 'hidden'}`}
            >
              <div className="rounded-md even:bg-gray-1 py-4 px-4 sm:px-5">
                {product?.description ? product.description : ''}
              </div>
            </div>
          </div>
          {/*  tab content one end - */}

          {/* <div>
            <div
              className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10 ${activeTab === 'tabTwo' ? 'block' : 'hidden'
                }`}
            >
              {product?.additionalInfo ?? ''}
            </div>
          </div> */}
        </div>

        <RelatedProducts productId={product?.id} />
      </section>
    </div>
  );
};

export default ProductDetails;
