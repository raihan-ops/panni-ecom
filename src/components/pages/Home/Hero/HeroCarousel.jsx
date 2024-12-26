'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import assets from '@/assets/asset';

// Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css';

import Image from 'next/image';

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      <SwiperSlide className="h-[25rem]">
        <div className="flex items-center justify-between pt-6 sm:pt-0 flex-col-reverse sm:flex-row h-full">
          <div className="w-full h-full relative">
            <Image
              src={assets.b1}
              alt="headphone"
              className="w-full h-full"
              // width={100}
              // height={358}
            />

            <div className="max-w-[500px] py-10 sm:py-16 lg:py-26 pl-4 sm:pl-7 lg:pl-12 text-white absolute -top-5">
              <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                <span className="block font-semibold text-6xl text-blue-500">30%</span>
                <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                  Sale
                  <br />
                  Off
                </span>
              </div>

              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                <a href="#">True Wireless Noise Cancelling Headphone</a>
              </h1>

              <p>Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum nec suscipit.</p>

              <a
                href="#"
                className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 bg-blue-900 hover:bg-blue mt-10"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="h-[25rem]">
        <div className="flex items-center justify-between pt-6 sm:pt-0 flex-col-reverse sm:flex-row h-full">
          <div className="w-full h-full relative">
            <Image
              src={assets.b2}
              alt="headphone"
              className="w-full h-full"
              // width={100}
              // height={358}
            />
            <div className="max-w-[500px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5 text-white absolute -top-5">
              <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                <span className="block font-semibold text-6xl text-blue-500">30%</span>
                <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                  Sale
                  <br />
                  Off
                </span>
              </div>

              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                <a href="#">True Wireless Noise Cancelling Headphone</a>
              </h1>

              <p>Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum nec suscipit.</p>

              <a
                href="#"
                className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 bg-blue-900 hover:bg-blue mt-10"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
