'use client';
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
const SlideNextButton = () => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slideNext()}>Next</button>;
};
const SlidePrevButton = () => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slidePrev()}>Prev</button>;
};

const Primary = ({
  data = [],
  children,
  className,
  slidesPerView = 1,
  showPrevAndNext = true,
  setSwiperController,
  centeredSlides = false,
  ...props
}) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={32}
        slidesPerView={slidesPerView}
        navigation
        loop={true}
        centeredSlides={false}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => setSwiperController(swiper)}
        // onSlideChange={() => console.log('slide change')}
        className={className}
        {...props}
      >
        {showPrevAndNext && <SlideNextButton />}
        {data?.map((value, index) => (
          <SwiperSlide key={index} className="border-none text-left">
            {({ isActive }) => <>{children(value, isActive)}</>}
          </SwiperSlide>
        ))}

        {showPrevAndNext && <SlidePrevButton />}
      </Swiper>
    </>
  );
};

export default Primary;
