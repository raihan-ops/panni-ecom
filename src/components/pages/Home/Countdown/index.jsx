'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_ACTIVE_OFFER } from '@/helpers/apiUrl';
import Link from 'next/link';
import { PATH_ALL_PRODUCT } from '@/helpers/Slugs';

const CountDown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [offer, setOffer] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTime = (deadline) => {
    const time = deadline - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(offer?.endDate), 1000);
    return () => clearInterval(interval);
  }, [offer]);

  useEffect(() => {
    (async function fetchOffer() {
      try {
        const response = await axios.get(`${GET_ACTIVE_OFFER}`);
        setOffer(response.data);
      } catch (error) {
        console.error('Error fetching offer:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="overflow-hidden py-4 md:py-16">
      {offer && (
        <div className="w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="relative z-1 grid grid-cols-1 sm:grid-cols-12 rounded-lg bg-[#D0E9F3]">
            <div className="w-full col-span-1 sm:col-span-5 p-6 sm:p-8 lg:p-10 xl:p-14">
              <h2 className="font-bold text-dark text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-4">
                {offer?.description}
              </h2>

              {/* Countdown Timer */}
              <div className="flex flex-wrap gap-4 sm:gap-6 mt-6">
                {/* Days */}
                <div>
                  <span className="min-w-[64px] h-14 font-semibold text-lg sm:text-xl lg:text-2xl text-dark rounded-lg flex items-center justify-center bg-white shadow-md px-4 mb-2">
                    {days < 10 ? '0' + days : days}
                  </span>
                  <span className="block text-sm sm:text-base text-dark text-center">Days</span>
                </div>

                {/* Hours */}
                <div>
                  <span className="min-w-[64px] h-14 font-semibold text-lg sm:text-xl lg:text-2xl text-dark rounded-lg flex items-center justify-center bg-white shadow-md px-4 mb-2">
                    {hours < 10 ? '0' + hours : hours}
                  </span>
                  <span className="block text-sm sm:text-base text-dark text-center">Hours</span>
                </div>

                {/* Minutes */}
                <div>
                  <span className="min-w-[64px] h-14 font-semibold text-lg sm:text-xl lg:text-2xl text-dark rounded-lg flex items-center justify-center bg-white shadow-md px-4 mb-2">
                    {minutes < 10 ? '0' + minutes : minutes}
                  </span>
                  <span className="block text-sm sm:text-base text-dark text-center">Minutes</span>
                </div>

                {/* Seconds */}
                <div>
                  <span className="min-w-[64px] h-14 font-semibold text-lg sm:text-xl lg:text-2xl text-dark rounded-lg flex items-center justify-center bg-white shadow-md px-4 mb-2">
                    {seconds < 10 ? '0' + seconds : seconds}
                  </span>
                  <span className="block text-sm sm:text-base text-dark text-center">Seconds</span>
                </div>
              </div>

              <Link
                href={`${PATH_ALL_PRODUCT}?offerId=${offer?.id}`}
                className="inline-flex items-center justify-center font-medium text-sm sm:text-base text-white bg-blue-500 hover:bg-blue-700 py-3 px-6 rounded-md mt-6 transition-all duration-200"
              >
                Check it Out!
              </Link>
            </div>

            {/* Background Image */}
            <div className="col-span-1 sm:col-span-7">
              <img
                src={offer?.image}
                alt="Offer Background"
                width={600}
                height={600}
                className="rounded-lg w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CountDown;
