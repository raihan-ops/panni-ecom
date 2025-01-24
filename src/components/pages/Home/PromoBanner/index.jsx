'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GET_ALL_BANNERS } from '@/helpers/apiUrl';

const PromoBanner = () => {
  const [promotionalBanner, setPromotionalBanner] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  };

  useEffect(() => {
    (async function fetchBanners() {
      try {
        const response = await axios.get(
          `${GET_ALL_BANNERS}?bannerType=HOMEPAGE_PROMOTIONAL`,
          axiosConfig,
        );
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
      <div className="w-full w-full mx-auto">
        {/* <!-- promo banner big --> */}
        {promotionalBanner && promotionalBanner.length > 0 && (
          <div className="relative z-1 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden rounded-lg bg-[#F5F5F7] mb-7">
            {/* Left Column: Text */}
            <div className="col-span-1 md:col-span-4 py-10 xl:py-16 pl-4 pr-1">
              <span className="block font-medium text-lg md:text-xl text-dark mb-3">
                {promotionalBanner[0].description}
              </span>
            </div>

            {/* Right Column: Image */}
            <div className="col-span-1 md:col-span-8 relative">
              <img
                src={promotionalBanner[0].image}
                alt="promo img"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PromoBanner;
