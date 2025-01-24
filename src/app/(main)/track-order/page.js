'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { GET_ORDER_BY_INVOICE_NO } from '@/helpers/apiUrl';
import { formatDate } from '@/helpers/utils';

const LoanRequestPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true', // Add this to skip the ngrok browser warning
    },
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${GET_ORDER_BY_INVOICE_NO}/${invoiceNumber}`);
      setOrder(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.message);
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="w-full mx-auto bg-white flex flex-col justify-center items-center">
        <div className="w-[95%] md:w-[50%] mt-20 shadow-lg rounded-lg p-6">
          <div className="text-start mb-4 w-full">
            <h4 className="text-2xl font-bold text-gray-800">Track Order</h4>
          </div>
          <form onSubmit={handelSubmit} className="w-full">
            <div className="flex items-center w-full gap-2 mt-3">
              <input
                type="text"
                className="flex-grow px-4 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-b;ack focus:border-black"
                name="passport"
                placeholder="Enter invoice number"
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md border transition-all duration-200 hover:text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Track
              </button>
            </div>
          </form>
        </div>
        {order && (
          <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg mt-10">
            {/* Invoice Header */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800">Invoice Details</h2>
              <p className="text-sm text-gray-600">
                Invoice Number: <span className="font-medium">{invoiceNumber}</span>
              </p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium">{order?.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                Created At: <span className="font-medium">{formatDate(order?.createdAt)}</span>
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-md font-bold text-gray-800">Contact Information</h3>
              <p className="text-sm text-gray-600">
                Mobile:{' '}
                <span className="font-medium">
                  {order?.countryCode} {order?.mobileNumber}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Address:{' '}
                <span className="font-medium">
                  {order?.deliveryAddress?.addressDesc}, {order?.deliveryAddress?.city}
                </span>
              </p>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-md font-bold text-gray-800">Products</h3>
              <ul className="mt-4">
                {order?.cartDetailsList.map((item) => (
                  <li key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium text-gray-800">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-800">
                      ৳{item.product.price.toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanRequestPage;
