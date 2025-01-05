import React from 'react';
import Image from 'next/image';
import assets from '@/assets/asset';

const PromoBanner = () => {
  return (
    <section className="overflow-hidden pt-20 pb-10">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- promo banner big --> */}
        <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12 lg:py-16 xl:py-28 px-4 sm:px-7 lg:px-14 xl:px-20 mb-7">
          <div className="max-w-[550px] w-full">
            <span className="block font-medium text-xl text-dark mb-3">Apple iPhone 14 Plus</span>

            <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
              UP TO 30% OFF
            </h2>

            <p>
              iPhone 14 has the same superspeedy chip that’s in iPhone 13 Pro, A15 Bionic, with a
              5‑core GPU, powers all the latest features.
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              Buy Now
            </a>
          </div>

          <Image
            src={assets.promoBanner1}
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
