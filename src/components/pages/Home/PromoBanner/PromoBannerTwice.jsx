'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_ALL_BANNERS } from '@/helpers/apiUrl';

const PromoBannerTwice = () => {
  const [promotionalBanner, setPromotionalBanner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchBanners() {
      try {
        const response = await axios.get(`${GET_ALL_BANNERS}?bannerType=HOMEPAGE_PROMOTIONAL`);
        setPromotionalBanner(response.data); // Assuming response.data contains the banners array
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="overflow-hidden pt-20 pb-10">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid gap-7 grid-cols-1 lg:grid-cols-2">
          {/* Promo Banner 1 */}
          {promotionalBanner && promotionalBanner.length > 1 && (
            <div className="relative min-h-[20rem] z-1 grid grid-cols-1 sm:grid-cols-12 gap-4 overflow-hidden rounded-lg bg-[#DBF4F3] p-4">
              <div className="col-span-1 sm:col-span-6">
                <img
                  src={promotionalBanner[1].image || ''}
                  alt="promo img"
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div className="col-span-1 sm:col-span-6 flex flex-col justify-center">
                <div className="min-h-32 w-full">
                  <span className="block text-lg text-dark mb-1.5">
                    {promotionalBanner[1].description || ''}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Promo Banner 2 */}
          {promotionalBanner && promotionalBanner.length > 2 && (
            <div className="relative min-h-[20rem] z-1 grid grid-cols-1 sm:grid-cols-12 gap-4 overflow-hidden rounded-lg bg-[#FFECE1] p-4">
              <div className="col-span-1 sm:col-span-6 flex items-center justify-center">
                <Image
                  src={promotionalBanner[2].image || ''}
                  alt="promo img"
                  className="w-full h-full rounded-lg"
                  width={200}
                  height={200}
                />
              </div>
              <div className="col-span-1 sm:col-span-6 flex flex-col justify-center">
                <div className="min-h-32">
                  <span className="block text-lg text-dark mb-1.5">
                    {promotionalBanner[2].description || ''}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromoBannerTwice;
