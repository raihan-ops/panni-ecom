'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css';

import Image from 'next/image';

const HeroCarousal = (data) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {/* {data.data?.map((item, index) => ( */}
      {Array.isArray(data.data) ? (
        data.data?.map((item, index) => (
          <SwiperSlide className="sslider h-[26rem]" key={index}>
            <div className="flex items-center justify-between sm:pt-0 flex-col-reverse sm:flex-row h-full">
              <div className="w-full h-full relative">
                <img
                  src={item?.image}
                  alt="headphone"
                  className="w-full h-full"
                  // width={400}
                  // height={100}
                />
              </div>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <p>No data available</p>
      )}
    </Swiper>
  );
};

export default HeroCarousal;
