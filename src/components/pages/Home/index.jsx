import React from 'react';
import Hero from './Hero';
import Categories from './Categories';
import NewArrival from './NewArrivals';
import PromoBanner from './PromoBanner';
import CounDown from './Countdown';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrival />
      <PromoBanner />
      <CounDown />
    </main>
  );
};

export default HomePage;
