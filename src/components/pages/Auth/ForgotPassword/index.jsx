'use client';

import Link from 'next/link';
import React from 'react';
import Breadcrumb from '../../Common/Breadcrumb';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/contexts/AuthContextProvider';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
  const { forgotPasswordHandler, loading } = useAuthContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await forgotPasswordHandler(data.email, (res) => {
      if (res.data) {
        router.push(`/otp-verify?email=${data.email}&type=forgot-password`);
      }
    });
  };

  return (
    <>
      <Breadcrumb title={'Forgot Password'} pages={['Forgot Password']} />
      <section className="overflow-hidden pb-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7 xl:p-11">
            <div className="text-center mb-8">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-2">
                Forgot Password
              </h2>
              <p>Enter your email address to reset your password</p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2">
                    Email Address <span className="text-red">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    placeholder="Enter your email address"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-black border py-3 px-6 rounded-lg ease-out duration-200 hover:bg-white hover:text-black mt-7"
                >
                  Continue
                </button>

                <p className="text-center mt-6">
                  Remember your password?
                  <Link
                    href="/signin"
                    className="text-dark ease-out duration-200 text-blue-700 hover:text-blue-700 pl-2"
                  >
                    Sign in Now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
