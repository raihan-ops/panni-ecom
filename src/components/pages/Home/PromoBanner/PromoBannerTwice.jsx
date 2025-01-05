import assets from '@/assets/asset';
import Image from 'next/image';
import React from 'react';

const PromoBannerTwice = () => {
  return (
    <section className="overflow-hidden pt-20 pb-10">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid gap-7 grid-cols-1 lg:grid-cols-2">
          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src={assets.promoBanner2}
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1"
              width={241}
              height={241}
            />

            <div className="text-right">
              <div className="min-h-32">
                <span className="block text-lg text-dark mb-1.5">Foldable Motorised Treadmill</span>

                <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                  Workout At Home
                </h2>

                <p className="font-semibold text-custom-1 text-teal">Flat 20% off</p>
              </div>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-3 px-8 rounded-md ease-out duration-200 bg-teal-500 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </a>
            </div>
          </div>

          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src={assets.promoBanner3}
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
              width={200}
              height={200}
            />

            <div>
              <div className="min-h-32">
                <span className="block text-lg text-dark mb-1.5">Apple Watch Ultra</span>

                <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                  Up to <span className="text-orange">40%</span> off
                </h2>

                <p className="max-w-[285px] text-custom-sm">
                  The aerospace-grade titanium case strikes the perfect balance of everything.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-orange-500 py-3 px-8 rounded-md ease-out duration-200 hover:bg-orange-700 mt-7"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerTwice;