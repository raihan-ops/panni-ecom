'use client';
import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
// import { motion } from "framer-motion";

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
  const duplicatedMessages = [...messages, ...messages];

  return (
    <>
      <div className="hidden md:block w-full mt-6 md:mt-16 mx-auto px-4 rounded-md border-2 border-[#FF69B4] py-6">
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

      <div className="block md:hidden w-full mt-6 md:mt-16 mx-auto px-4 rounded-md border-2 border-[#FF69B4] py-3">
        <div className="relative w-full overflow-hidden text-[#FF69B4] py-3">
          {/* Container for the ticker */}
          <div className="ticker flex animate-marquee whitespace-nowrap">
            {/* Render duplicated messages */}
            {duplicatedMessages.map((message, index) => (
              <p key={index} className="text-lg font-semibold pr-6">
                {message}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
const styles = `
  @keyframes marquee {
    0% {
      transform: translateX(0%); /* Start at the initial position */
    }
    100% {
      transform: translateX(-50%); /* Move to the left by 50% of the container width */
    }
  }

  .ticker {
    display: flex;
    gap: 2rem; /* Spacing between messages */
    width: max-content; /* Ensure the ticker container is wide enough */
  }

  .animate-marquee {
    animation: marquee 20s linear infinite; /* Adjust speed by modifying 20s */
  }
`;
export default HeroFeature;
// Inject styles into the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
