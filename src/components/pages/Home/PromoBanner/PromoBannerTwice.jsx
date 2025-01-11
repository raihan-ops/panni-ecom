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
        <div className="grid gap-7 grid-cols-1 lg:grid-cols-2">
          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src={
                promotionalBanner && promotionalBanner.length > 1 ? promotionalBanner[1].image : ''
              }
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1"
              width={241}
              height={241}
            />

            <div className="text-right">
              <div className="min-h-32">
                <span className="block text-lg text-dark mb-1.5">
                  {promotionalBanner && promotionalBanner.length > 1
                    ? promotionalBanner[1].description
                    : ''}
                </span>
              </div>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-3 px-8 rounded-md ease-out duration-200 bg-teal-500 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </a>
            </div>
          </div>

          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src={
                promotionalBanner && promotionalBanner.length > 2 ? promotionalBanner[2].image : ''
              }
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
              width={200}
              height={200}
            />

            <div>
              <div className="min-h-32">
                <span className="block text-lg text-dark mb-1.5">
                  {promotionalBanner && promotionalBanner.length > 2
                    ? promotionalBanner[2].description
                    : ''}
                </span>

                {/*<p className="max-w-[285px] text-custom-sm">*/}
                {/*    The aerospace-grade titanium case strikes the perfect balance of everything.*/}
                {/*</p>*/}
              </div>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-orange-500 py-3 px-8 rounded-md ease-out duration-200 hover:bg-orange-700 mt-7"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerTwice;
