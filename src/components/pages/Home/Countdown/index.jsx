'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
    // @ts-ignore
    const interval = setInterval(() => getTime(offer?.endDate), 1000);

    return () => clearInterval(interval);
  }, [offer]);

  useEffect(() => {
    (async function fetchOffer() {
      try {
        const response = await axios.get(`${GET_ACTIVE_OFFER}`);
        setOffer(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="overflow-hidden py-16 ">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 ">
        <div className="relative overflow-hidden z-1 rounded-lg bg-[#D0E9F3] p-4 sm:p-7.5 lg:p-10 xl:p-15">
          <div className="max-w-[422px] w-full h-[300px]">
            <h2 className="font-bold text-dark text-xl lg:text-heading-4 xl:text-heading-3 mb-3">
              {offer?.description}
            </h2>

            {/* <!-- Countdown timer --> */}
            <div className="flex flex-wrap gap-6 mt-6" x-data="timer()" x-init="countdown()">
              {/* <!-- timer day --> */}
              <div>
                <span
                  className="min-w-[64px] h-14.5 font-semibold text-xl lg:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-2 px-4 mb-2"
                  x-text="days"
                >
                  {' '}
                  {days < 10 ? '0' + days : days}{' '}
                </span>
                <span className="block text-custom-sm text-dark text-center">Days</span>
              </div>

              {/* <!-- timer hours --> */}
              <div>
                <span
                  className="min-w-[64px] h-14.5 font-semibold text-xl lg:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-2 px-4 mb-2"
                  x-text="hours"
                >
                  {' '}
                  {hours < 10 ? '0' + hours : hours}{' '}
                </span>
                <span className="block text-custom-sm text-dark text-center">Hours</span>
              </div>

              {/* <!-- timer minutes --> */}
              <div>
                <span
                  className="min-w-[64px] h-14.5 font-semibold text-xl lg:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-2 px-4 mb-2"
                  x-text="minutes"
                >
                  {minutes < 10 ? '0' + minutes : minutes}{' '}
                </span>
                <span className="block text-custom-sm text-dark text-center">Minutes</span>
              </div>

              {/* <!-- timer seconds --> */}
              <div>
                <span
                  className="min-w-[64px] h-14.5 font-semibold text-xl lg:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-2 px-4 mb-2"
                  x-text="seconds"
                >
                  {seconds < 10 ? '0' + seconds : seconds}{' '}
                </span>
                <span className="block text-custom-sm text-dark text-center">Seconds</span>
              </div>
            </div>
            {/* <!-- Countdown timer ends --> */}

            <Link
              href={`${PATH_ALL_PRODUCT}?offerId=${offer?.id}`}
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-3 px-9 rounded-md ease-out duration-200 bg-blue-500 hover:bg-blue-700 mt-7"
            >
              Check it Out!
            </Link>
          </div>

          {/* <!-- bg shapes --> */}
          <Image
            src={offer?.image}
            alt="bg shapes"
            className="hidden sm:block absolute right-0 bottom-0 -z-1"
            width={737}
            height={482}
          />
        </div>
      </div>
    </section>
  );
};

export default CountDown;
