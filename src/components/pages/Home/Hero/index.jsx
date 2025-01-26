'use client';
import React, { useEffect, useState } from 'react';
import HeroCarousel from './HeroCarousel';
import HeroFeature from './HeroFeature';
import Image from 'next/image';
import assets from '@/assets/asset';
import axios from 'axios';
import { GET_ALL_BANNERS } from '@/helpers/apiUrl';

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchBanners() {
      try {
        const response = await axios.get(`${GET_ALL_BANNERS}?bannerType=HOMEPAGE_SLIDER`);
        setBanners(response.data); // Assuming response.data contains the banners array
        // console.log('Banners--------', response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="overflow-hidden pt-6 pb-10 lg:pb-12 xl:pb-12 lg:pt-5 xl:pt-5 rounded">
      <div className="w-full mx-auto sm:px-0 md:px-8 lg:px-4 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="w-full hero_welcome_banner">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src={assets.heroBg}
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel data={banners} />
            </div>
          </div>

          {/* <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20">
                      <a href="#"> iPhone 14 Plus & 14 Pro Max </a>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          $699
                        </span>
                        <span className="font-medium text-2xl text-dark-4 line-through">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src={assets.heroBg}
                      alt="mobile image"
                      width={123}
                      height={161}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20">
                      <a href="#"> Wireless Headphone </a>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          $699
                        </span>
                        <span className="font-medium text-2xl text-dark-4 line-through">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src={assets.heroBg}
                      alt="mobile image"
                      width={123}
                      height={161}
                    />
                  </div>
                </div>
              </div>

              
            </div>
          </div> */}
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
