'use client';
import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItemSecond';
import Link from 'next/link';
import { PATH_ALL_PRODUCT } from '@/helpers/Slugs';
import axios from 'axios';
import { GET_ALL_PRODUCTS } from '@/helpers/apiUrl';
// import ProductItem from './ProductItem';

const NewProductItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchProducts() {
      try {
        const response = await axios.get(`${GET_ALL_PRODUCTS}?size=${9}&categoryType=NEW_ARRIVAL`);
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
          <h2 className="text-2xl font-bold mb-2">New Arrival</h2>
          <Link
            href={PATH_ALL_PRODUCT}
            className="border h-fit rounded py-1 px-5 text-center text-sm bg-white transition-all duration-500 hover:bg-black hover:text-white"
          >
            See More
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-9">
          {products?.slice(0, 4).map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>
      </div>
      {/* <div className='grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-9'> */}
      {/* <div className="grid grid-cols-12 grid-rows-2 grid-flow-col gap-x-7 gap-y-9 mt-7">
        <div className="sm:col-span-12 md:col-span-6 md:row-span-2 pImgsecMain">
          {products?.slice(4, 5).map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>

        <div className="col-span-6 row-start-1">
          <div className="grid grid-cols-2 gap-x-7 gap-y-9">
            {products?.slice(5, 7).map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        </div>
        <div className="col-span-6 row-start-2">
          <div className="grid grid-cols-2 gap-x-7 gap-y-9">
            {products?.slice(7, 9).map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-7 gap-y-9 mt-7">
        <div className="sm:col-span-2 md:col-span-2 md:row-span-2 pImgsecMain">
          {products?.slice(4, 5).map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>

        <div className="sm:col-span-2 md:col-span-2">
          <div className="grid grid-cols-2 gap-x-7 gap-y-9 order1">
            {products?.slice(5, 7).map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-7 gap-y-9 order2">
            {products?.slice(7, 9).map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductItems;
