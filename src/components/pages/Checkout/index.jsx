'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import { Form, Select, Modal, message } from 'antd';
import Image from 'next/image';
import assets from '@/assets/asset';
import { Checkbox } from 'antd';
import { useGlobalContext } from '@/contexts/GlobalContextProvider';
import { useForm } from 'react-hook-form';
import api from '@/providers/Api';
import { ORDER_PLACED_API_URL } from '@/helpers/apiUrl';
import { Toast } from '@/components/shared/toast/Toast';
import { INSIDE_DHAKA_CITIES, OUTSIDE_DHAKA_CITIES } from '@/helpers/constant';

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const CheckoutPage = () => {
  const { cart, updateCart, settingsData, clearCart } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [deliveryType, setDeliveryType] = useState('INSIDE_DHAKA');
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [orderInfo, setOrderInfo] = useState({});
  const [orderSuccessModal, setOrderSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      note: '',
      termsAccepted: false,
      shippingMethod: 'standard',
      paymentMethod: 'cod',
      couponCode: '',
    },
  });

  const getShippingFee = () => {
    return watch('shippingMethod') === 'standard' ? 130 : 0;
  };

  useEffect(() => {
    if (deliveryType === 'INSIDE_DHAKA') {
      setDeliveryCharge(settingsData?.deliveryChargeInsideDhaka || 0);
    } else {
      setDeliveryCharge(settingsData?.deliveryChargeOutsideDhaka || 0);
    }
  }, [deliveryType]);

  const calculateTotals = () => {
    const subtotal = cart.invoice.totalPrice || 0;
    const shippingFee = deliveryCharge;
    const tax = 0;
    const discount = 0;
    const finalPrice = subtotal + shippingFee + tax - discount;

    return {
      subtotal,
      shippingFee,
      tax,
      discount,
      finalPrice,
    };
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    console.log('Applying coupon:', watch('couponCode'));
  };

  const handleDelete = (product) => {
    const cartItem = cart.cartDetailsList.find((item) => item.product.id === product.id);
    updateCart(product, 0, cartItem.selectedColor, cartItem.selectedSize);
  };

  const handleQuantityChange = (product, operation) => {
    const cartItem = cart.cartDetailsList.find((item) => item.product.id === product.id);
    const currentQuantity = cartItem?.quantity || 0;
    const newQuantity =
      operation === 'increase' ? currentQuantity + 1 : Math.max(currentQuantity - 1, 0);

    updateCart(product, newQuantity, cartItem.selectedColor, cartItem.selectedSize);
  };

  const onSubmit = (formData) => {
    // Transform cart items into the required format
    const cartDetailsList = cart.cartDetailsList.map((item) => ({
      product: { id: item.product.id },
      quantity: item.quantity,
      // selectedColor: item.selectedColor.id,
      // selectedSize: item.selectedSize,
    }));

    // Prepare API payload
    const payload = {
      cartDetailsList,
      mobileNumber: formData.phone,
      fullName: formData.fullName,
      email: formData.email,
      countryCode: '+880',
      deliveryAddress: {
        city: formData.city,
        addressDesc: formData.address,
      },
      addressType: deliveryType,
    };

    // console.log('API Payload:', payload);

    api.post(
      {
        url: ORDER_PLACED_API_URL,
        body: payload,
        setLoading,
      },
      (res) => {
        if (res.data) {
          setOrderInfo(res?.data);
          setOrderSuccessModal(true);
          clearCart();
          // Toast('success', 'success', 'Order has been placed successfully');
        }
      },
    );
  };

  const handleCopyInvoice = async () => {
    try {
      await navigator.clipboard.writeText(orderInfo.invoiceNumber);
      message.success('Invoice number copied to clipboard!');
    } catch (err) {
      message.error('Failed to copy invoice number');
    }
  };

  return (
    <div className="container">
      <Breadcrumb title={'Checkout'} pages={['Checkout']} />

      <section className="overflow-hidden py-10">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7">
            <div className="xl:max-w-[770px] w-full bg-gray-100 rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
              <h1 className="mb-5 text-2xl font-medium">Cart Items</h1>
              {cart.cartDetailsList && cart.cartDetailsList.length > 0 ? (
                <div className="mb-12 h-44 overflow-y-auto rounded-lg cartSection">
                  {cart.cartDetailsList.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="px-3 py-3 mb-2 bg-white rounded-md flex justify-between items-center shadow-md relative"
                    >
                      <div className="rounded-lg">
                        {product.images.length > 0 && (
                          <Image
                            width={40}
                            height={40}
                            src={product?.images[0]?.image}
                            alt="cart-product"
                          />
                        )}
                      </div>
                      <div className="w-80">
                        <p className="line-clamp-2">{product.name}</p>
                      </div>
                      <div className="flex items-center w-fit rounded-md border border-gray-3">
                        <button
                          aria-label="button for remove product"
                          className="flex items-center justify-center w-6 h-6 ease-out duration-200 hover:text-blue"
                          onClick={() => handleQuantityChange(product, 'decrease')}
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
                          {quantity}
                        </span>

                        <button
                          onClick={() => handleQuantityChange(product, 'increase')}
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
                        <p className="text-gray-500 text-sm">৳{product.price * quantity}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(product)}
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

              <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mb-5 text-2xl font-medium">Shipping information</h1>
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="fullName" className="block mb-1 text-sm">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('fullName', {
                        required: 'Full name is required',
                        minLength: { value: 3, message: 'Name must be at least 3 characters' },
                      })}
                      type="text"
                      placeholder="Name"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <label htmlFor="email" className="block mb-1 text-sm">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="text"
                      placeholder="**@email.com"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="phone" className="block mb-1 text-sm">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: 'Please enter a valid 11-digit phone number',
                        },
                      })}
                      type="text"
                      placeholder="Enter your phone"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <label htmlFor="city" className="block mb-1 text-sm">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Select
                      {...register('city', { required: 'City is required' })}
                      onChange={(value) => setValue('city', value)}
                      className="rounded-md border border-gray-3 bg-gray-1 w-full h-10 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                      options={
                        deliveryType === 'INSIDE_DHAKA' ? INSIDE_DHAKA_CITIES : OUTSIDE_DHAKA_CITIES
                      }
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-7 border-b pb-7">
                  <label htmlFor="address" className="block mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('address', {
                      required: 'Address is required',
                      minLength: { value: 10, message: 'Address must be at least 10 characters' },
                    })}
                    rows={2}
                    placeholder="Type your address"
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div className="mb-7 mt-5">
                  <label htmlFor="note" className="block mb-2">
                    Note
                  </label>

                  <textarea
                    {...register('note')}
                    rows={1}
                    placeholder="Type your message"
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="mb-4">
                  <Checkbox
                    checked
                    // {...register('termsAccepted', {
                    //   required: 'You must accept the terms and conditions',
                    // })}
                  >
                    I agree to the <span className="text-blue-500">Terms and Conditions</span>
                  </Checkbox>
                  {errors.termsAccepted && (
                    <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</p>
                  )}
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="inline-flex font-medium text-white bg-blue-500 py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-700"
                >
                  {loading ? 'Loading...' : 'Place Order'}
                </button>
              </form>
            </div>

            <div className="xl:max-w-[370px] w-full h-fit bg-gray-100 rounded-xl shadow-1">
              <div className="p-4 sm:p-7.5">
                <div className="flex flex-col gap-4">
                  <div className="w-full">
                    <label htmlFor="deliveryType" className="block mb-1 text-sm">
                      Delivery Type
                    </label>
                    <Select
                      value={deliveryType}
                      onChange={(value) => setDeliveryType(value)}
                      className="rounded-md border border-gray-3 bg-gray-1 w-full h-10 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                      options={[
                        { label: 'Inside-Dhaka', value: 'INSIDE_DHAKA' },
                        { label: 'Outside-Dhaka', value: 'OUTSIDE_DHAKA' },
                      ]}
                    />
                  </div>
                  <div className="mb-4">
                    <p className="flex items-center gap-4">Shipping Method:</p>
                    <div className="border w-full my-2 bg-white rounded-md px-4 py-2">
                      Delivery Charge | ৳{' '}
                      {deliveryType === 'INSIDE_DHAKA'
                        ? settingsData?.deliveryChargeInsideDhaka
                        : settingsData?.deliveryChargeOutsideDhaka}
                    </div>
                    {/* <Checkbox
                      
                      checked={watch('shippingMethod') === 'standard'}
                      onChange={(e) =>
                        setValue('shippingMethod', e.target.checked ? 'standard' : '')
                      }
                      disabled
                    >
                      Delivery Charge | ৳{' '}
                      {deliveryType === 'INSIDE_DHAKA'
                        ? settingsData?.deliveryChargeInsideDhaka
                        : settingsData?.deliveryChargeOutsideDhaka}
                    </Checkbox> */}
                  </div>

                  <div className="mb-4">
                    <p className="flex items-center gap-4">Payment method:</p>
                    <Checkbox
                      checked={watch('paymentMethod') === 'cod'}
                      className="border w-full my-2 bg-white rounded-md px-4 py-2"
                      onChange={(e) => setValue('paymentMethod', e.target.checked ? 'cod' : '')}
                    >
                      Cash on delivery
                    </Checkbox>
                  </div>

                  <div className="mb-4 border-b pb-5">
                    {(() => {
                      const totals = calculateTotals();
                      return (
                        <>
                          <div className="flex justify-between items-center text-gray-600">
                            <p className="w-fit">Subtotal:</p>
                            <p className="w-fit">৳{totals.subtotal}</p>
                          </div>

                          <div className="flex justify-between items-center text-gray-600">
                            <p className="w-fit">Shipping fee:</p>
                            <p className="w-fit">৳{totals.shippingFee}</p>
                          </div>

                          <div className="flex justify-between items-center text-gray-600">
                            <p className="w-fit">Tax:</p>
                            <p className="w-fit">৳{totals.tax}</p>
                          </div>

                          <div className="flex justify-between items-center text-gray-600">
                            <p className="w-fit">Discount:</p>
                            <p className="w-fit">৳{totals.discount}</p>
                          </div>

                          <div className="flex justify-between items-center">
                            <p className="w-fit">Total:</p>
                            <p className="w-fit">৳{totals.finalPrice}</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <div className="w-full">
                    <label htmlFor="couponCode" className="block mb-1 text-sm">
                      Coupon code
                    </label>

                    <input
                      {...register('couponCode')}
                      type="text"
                      placeholder="Enter your code"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-black"
                    />

                    <button
                      onClick={handleCouponSubmit}
                      type="button"
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

      <Modal
        title="Order Placed Successfully!"
        open={orderSuccessModal}
        onOk={() => setOrderSuccessModal(false)}
        onCancel={() => setOrderSuccessModal(false)}
        footer={[
          <button
            key="ok"
            onClick={() => setOrderSuccessModal(false)}
            className="inline-flex font-medium text-white bg-blue-500 py-2 px-7 rounded-md ease-out duration-200 hover:bg-blue-700"
          >
            OK
          </button>,
        ]}
      >
        <div className="py-4">
          <p className="text-lg text-green-600 mb-4">
            Thank you! Your order has been placed successfully.
          </p>
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md">
            <span className="font-medium">Invoice Number:</span>
            <span>{orderInfo.invoiceNumber}</span>
            <button
              onClick={handleCopyInvoice}
              className="ml-2 p-2 hover:bg-gray-200 rounded-md"
              title="Copy invoice number"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
