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
    <div className="w-full my-16 mx-auto sm:px-4 md:px-0 round-md border-2 py-6">
      <TypeAnimation
        sequence={[
          ...sequence,
          () => {
            console.log('Animation sequence completed');
          },
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: '18px', display: 'inline-block' }}
      />
    </div>
  );
};

export default HeroFeature;
