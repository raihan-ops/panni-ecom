import React from 'react';
import Hero from './Hero';
import Categories from './Categories';
import NewArrival from './NewArrivals';
import PromoBanner from './PromoBanner';
import CounDown from './Countdown';
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
      <CounDown />
    </main>
  );
};

export default HomePage;
