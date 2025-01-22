import React from 'react';
import Hero from './Hero';
import Categories from './Categories';
import PromoBanner from './PromoBanner';
import CountDown from './Countdown';
import SectionProductItems from '../Common/SectionProductItems';
import ReverseProductItems from '../Common/ReverseProductItems';
import PromoBannerTwice from './PromoBanner/PromoBannerTwice';

const HomePage = () => {
  return (
    <main className="mb-20">
      <Hero />
      <Categories />
      {/* <NewArrival /> */}
      <SectionProductItems />
      <PromoBanner />
      <ReverseProductItems />
      <PromoBannerTwice />
      <CountDown />
    </main>
  );
};

export default HomePage;
