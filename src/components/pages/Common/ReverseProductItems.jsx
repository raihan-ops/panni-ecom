'use client';
import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItemSecond';
import Link from 'next/link';
import { PATH_ALL_PRODUCT } from '../../../helpers/Slugs';
import axios from 'axios';
import { GET_ALL_PRODUCTS } from '../../../helpers/apiUrl';
// import ProductItem from './ProductItem';

const ReverseProductItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchProducts() {
      try {
        const response = await axios.get(`${GET_ALL_PRODUCTS}?size=${9}&category=men`);
        setProducts(response.data.content);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold mb-2">Women&apos;s</h2>
          <Link
            href={PATH_ALL_PRODUCT}
            className="border h-fit rounded py-1 px-5 text-center text-sm bg-white transition-all duration-500 hover:bg-black hover:text-white"
          >
            See More
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-9">
          {/* <!-- New Arrivals item --> */}
          {products.slice(0, 4).map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>
      </div>
      {/* <div className='grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-9'> */}
      <div className="grid grid-cols-12 grid-rows-1 grid-flow-col gap-x-7 gap-y-9 mt-7">
        <div className="col-span-6 row-start-1">
          <div className="grid grid-cols-2 gap-x-7 gap-y-9">
            {products.slice(5, 7).map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        </div>
        <div className="col-span-6 row-start-2">
          <div className="grid grid-cols-2 gap-x-7 gap-y-9">
            {products.slice(5, 7).map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        </div>
        <div className="col-span-6 row-span-2 pImgsecMain">
          {products.slice(4, 5).map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReverseProductItems;
