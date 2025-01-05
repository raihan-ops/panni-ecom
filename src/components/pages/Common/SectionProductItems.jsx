import React from 'react';
import shopData from '../Shop/shopData';
import ProductItem from './ProductItemSecond';
import Link from 'next/link';
import { PATH_ALL_PRODUCT } from '@/helpers/Slugs';
// import ProductItem from './ProductItem';

const SectionProductItems = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold mb-2">Men&apos;s</h2>
          <Link
            href={PATH_ALL_PRODUCT}
            className="border h-fit rounded py-1 px-5 text-center text-sm bg-white transition-all duration-500 hover:bg-black hover:text-white"
          >
            See More
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-9">
          {/* <!-- New Arrivals item --> */}
          {shopData.slice(0, 4).map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>
      </div>
      {/* <div className='grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-9'> */}
      <div className="grid grid-cols-12 grid-rows-2 grid-flow-col gap-x-7 gap-y-9 mt-7">
        <div className="col-span-6 row-span-2 pImgsecMain">
          {shopData.slice(4, 5).map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>

        <div className="col-span-6 row-start-1">
          <div className="grid grid-cols-2 gap-x-7 gap-y-9">
            {shopData.slice(5, 7).map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        </div>
        <div className="col-span-6 row-start-2">
          <div className="grid grid-cols-2 gap-x-7 gap-y-9">
            {shopData.slice(5, 7).map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionProductItems;
