import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductItem from '@/components/pages/Common/ProductItem';
import axios from 'axios';
import { GET_RELETED_PRODUCTS } from '@/helpers/apiUrl';

const RelatedProducts = ({ productId }) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchProducts() {
      try {
        const response = await axios.get(`${GET_RELETED_PRODUCTS}/${productId}?size=${8}`);
        setProducts(response.data.content);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  return (
    <div>
      <section className="overflow-hidden pt-16">
        <div className=" w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* <!-- section title --> */}
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-2xl xl:text-heading-5 text-dark">
                Suggested Products
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-9">
            {/* <!-- Related Products item --> */}
            {products?.map((item, key) => (
              <div key={key}>
                <Link href={`/products/${item?.slug}`}>
                  <ProductItem item={item} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RelatedProducts;
