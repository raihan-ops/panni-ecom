'use client';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const HeroFeature = () => {
  const messages = [
    "Your one-stop destination for premium ladies' handbags in Bangladesh.",
    'Explore a wide range of stylish and affordable handbags.',
    'Designed for women who value quality and elegance.',
  ];

  if (!messages.length) {
    return null;
  }

  const sequence = messages.flatMap((message) => [message, 2000]);

  return (
    <div className="w-full mt-16 mx-auto px-4 rounded-md border-2 border-[#FF69B4] py-6">
      <TypeAnimation
        sequence={[
          ...sequence,
          () => {
            console.log('');
          },
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: '18px', display: 'inline-block', color: '#FF69B4' }}
      />
    </div>
  );
};

export default HeroFeature;
