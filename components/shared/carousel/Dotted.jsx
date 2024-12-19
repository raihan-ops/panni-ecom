'use client';
import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import { twMerge } from 'tailwind-merge';
import { Icons } from '@/assets/icons';

// onClick={() => swiper.slideNext()}

// onClick={() => swiper.slidePrev()}

const SlideNextButton = () => {
  const swiper = useSwiper();

  return (
    <div
      className="group cursor-pointer md:h-8 lg:h-11 md:w-8 lg:w-11 flex justify-center items-center bg-white border rounded-full absolute top-[40%] transform- translate-y-1/2 z-10 right-5 slider-next"
      onClick={() => swiper.slideNext()}
    >
      <Icons.RightIcon className="text-black group-hover:text-red-500 w-[5px]" />
    </div>
  );
};
const SlidePrevButton = () => {
  const swiper = useSwiper();

  return (
    <div
      className="group cursor-pointer md:h-8 lg:h-11 md:w-8 lg:w-11 flex justify-center items-center bg-white border rounded-full absolute top-[40%] transform- translate-y-1/2 z-10 left-5 slider-prev"
      onClick={() => swiper.slidePrev()}
    >
      <Icons.LeftIcon className="text-black group-hover:text-red-500 w-[5px] " />
    </div>
  );
};

const Dotted = ({
  data = [],
  children,
  className,
  slidesPerView = 1,
  showPrevAndNext = true,
  ...props
}) => {
  const customPagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className} custom-bullet"></span>`;
    },
  };
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={5}
        slidesPerView={slidesPerView}
        navigation
        loop={true}
        centeredSlides={true}
        pagination={customPagination}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        className={twMerge('customSwiper relative', className)}
        {...props}
      >
        {showPrevAndNext && <SlideNextButton />}
        {data?.map((value, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => <>{children(value, isActive)}</>}
          </SwiperSlide>
        ))}

        {showPrevAndNext && <SlidePrevButton />}
      </Swiper>
    </>
  );
};

export default Dotted;
