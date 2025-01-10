'use client';
import React from 'react';
import { Icons } from '@/assets/icons';

const featureData = [
  {
    img: <Icons.icon1 />,
    title: 'Free Shipping',
    description: 'For all orders $200',
  },
  {
    img: <Icons.icon2 />,
    title: '1 & 1 Returns',
    description: 'Cancellation after 1 day',
  },
  {
    img: <Icons.icon3 />,
    title: '100% Secure Payments',
    description: 'Gurantee secure payments',
  },
  {
    img: <Icons.icon4 />,
    title: '24/7 Dedicated Support',
    description: 'Anywhere & anytime',
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-[50px] mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            {item.img}
            <div>
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
