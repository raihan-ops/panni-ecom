'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const QuickViewModal = ({ product, isModalOpen, closeModal, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activePreview, setActivePreview] = useState(0);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    closeModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.modal-content')) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setQuantity(1);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div
      className={`${
        isModalOpen ? 'z-99999' : 'hidden'
      } fixed top-0 left-0 overflow-y-auto w-full h-screen bg-dark/70 flex items-center justify-center`}
    >
      <div className="w-full max-w-[1100px] rounded-xl bg-white p-8 relative modal-content">
        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close Modal"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400"
        >
          ✕
        </button>

        <div className="flex flex-wrap gap-8">
          {/* Image Section */}
          <div className="max-w-[500px] w-full">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                {product?.imgs?.thumbnails?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePreview(index)}
                    className={`border rounded-lg p-1 ${
                      activePreview === index ? 'border-blue-500' : ''
                    }`}
                  >
                    <Image src={img || ''} alt={`Thumbnail ${index}`} width={50} height={50} />
                  </button>
                ))}
              </div>

              <div className="relative flex items-center justify-center w-full bg-gray-100 rounded-lg">
                <Image
                  src={product?.imgs?.previews?.[activePreview] || ''}
                  alt="Product Preview"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="max-w-[400px] w-full">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              SALE 20% OFF
            </span>
            <h3 className="text-2xl font-semibold my-4">{product?.title}</h3>
            <p className="text-lg text-gray-600 mb-4">{product?.description}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-blue-600">${product?.price}</span>
              {product?.originalPrice && (
                <span className="text-sm line-through text-gray-500">
                  ${product?.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
