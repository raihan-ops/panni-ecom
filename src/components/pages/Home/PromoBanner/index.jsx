'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GET_ALL_BANNERS } from '@/helpers/apiUrl';

const PromoBanner = () => {
  const [promotionalBanner, setPromotionalBanner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchBanners() {
      try {
        const response = await axios.get(`${GET_ALL_BANNERS}?bannerType=HOMEPAGE_PROMOTIONAL`);
        setPromotionalBanner(response.data); // Assuming response.data contains the banners array
        // console.log('Banners--------', response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <section className="overflow-hidden pt-20 pb-10">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- promo banner big --> */}
        <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12 lg:py-16 xl:py-28 px-4 sm:px-7 lg:px-14 xl:px-20 mb-7">
          <div className="max-w-[550px] w-full">
            <span className="block font-medium text-xl text-dark mb-3">
              {promotionalBanner && promotionalBanner.length > 0
                ? promotionalBanner[0].description
                : ''}
            </span>

            <a
              href="#"
              className="inline-flex font-medium text-custom-sm text-black bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              Buy Now
            </a>
          </div>

          <Image
            src={
              promotionalBanner && promotionalBanner.length > 0 ? promotionalBanner[0].image : ''
            }
            alt="promo img"
            className="absolute bottom-0 right-4 lg:right-26 -z-1"
            width={274}
            height={350}
          />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
