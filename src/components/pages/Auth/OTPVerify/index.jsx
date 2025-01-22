'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContextProvider';
import Breadcrumb from '../../Common/Breadcrumb';

const OTPVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { otpVerify, sendOtp } = useAuthContext();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const email = searchParams.get('email');
  const type = searchParams.get('type');

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const handleResendOTP = async () => {
    if (timer === 0) {
      await sendOtp(email, () => {
        setTimer(60);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Add this state to track if form was submitted

    if (!otp) {
      // Show error or toast message if needed
      return;
    }
    const otpString = otp.join('');

    if (otpString.length === 6) {
      await otpVerify({ email, otp: otpString, type }, () => {
        //   router.push('/dashboard');
      });
    }
  };

  return (
    <>
      <Breadcrumb title="Verify OTP" pages={['Verify OTP']} />
      <section className="overflow-hidden pb-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7 xl:p-11">
            <div className="text-center mb-8">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-2">
                Verify OTP
              </h2>
              <p>Enter the verification code sent to {email}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center gap-2 mb-8">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`w-12 h-12 text-center border rounded-lg text-xl font-semibold 
                      ${!data && isSubmitted ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-black py-3 px-6 rounded-lg border ease-out duration-200 hover:bg-white hover:text-black"
              >
                Verify OTP
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  {timer > 0 ? (
                    <span>Resend in {timer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-blue-700 hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default OTPVerify;
