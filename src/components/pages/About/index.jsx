import Image from 'next/image';
import React from 'react';
import Breadcrumb from '../Common/Breadcrumb';

const AboutPage = () => {
  const locale = 'en'; // Replace with a logic to determine locale if necessary
  const t = {
    aboutLongText:
      'This is a long description about me. The ZShop store template was written to consolidate my front-end knowledge, using technologies such as Nextjs, Typescript, React, Tailwindcss, etc. as a portfolio. I would like to thank CafeDX and engineer Seyed Mehdi Hasanpour for his support.',
    cafeDX: 'CafeDX is an amazing place to work and enjoy.',
    aboutEnjoy: 'I enjoy creating meaningful software.',
    myName: 'My name is John Doe.',
  }; // Replace with your localized text logic

  // const StartQuot = locale === "en" ? RiDoubleQuotesL : RiDoubleQuotesR;
  // const EndQuot = locale === "en" ? RiDoubleQuotesR : RiDoubleQuotesL;

  return (
    <>
      <Breadcrumb title={'About'} pages={['About-us']} />

      <div className="flex w-full xl:max-w-[2100px] mx-auto mt-10">
        <div className="w-full lg:w-1/2 mt-8 md:mt-0 px-4 sm:px-8 md:px-0">
          <p className="leading-8 md:text-justify">{t.aboutLongText}</p>
          <br />
          <p>
            {/* <StartQuot
                        style={{
                            display: "inline",
                            verticalAlign: "top",
                            fontSize: "0.8rem",
                            color: "#A71B4A",
                        }}
                    /> */}
            {t.cafeDX}
            {/* <EndQuot
                        style={{
                            display: "inline",
                            verticalAlign: "top",
                            fontSize: "0.8rem",
                            color: "#A71B4A",
                        }}
                    /> */}
            &nbsp;
            <a
              href="https://cafedx.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-palette-side underline font-bold bg-palette-primary px-2"
            >
              CafeDX
            </a>
          </p>
          <p className="my-4">{t.aboutEnjoy}</p>
          <p>{t.myName}</p>
        </div>
        <div className="hidden md:block flex-grow text-center">
          <Image
            src="https://zishop.vercel.app/images/about-me.svg"
            alt="about me"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
