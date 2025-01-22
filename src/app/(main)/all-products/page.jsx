import AllProductsPAge from '@/components/pages/All-products';
import React from 'react';

const AllProducts = ({ searchParams }) => {
  return (
    <div>
      <AllProductsPAge params={searchParams} />
    </div>
  );
};

export default AllProducts;
