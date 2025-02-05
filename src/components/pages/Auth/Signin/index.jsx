'use client';
// import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from 'next/link';
import React from 'react';
import Breadcrumb from '../../Common/Breadcrumb';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/contexts/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/shared/toast/Toast';
import { PATH_FORGOT_PASSWORD } from '@/helpers/Slugs';

const Signin = () => {
  const { loginHandler, loading } = useAuthContext();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginHandler(data, (response) => {});
  };

  return (
    <>
      <section className="container overflow-hidden pb-20 bg-gray-2">
        <div className="w-full mx-auto px-4 sm:px-8 xl:px-0">
          <Breadcrumb title={'Sign-in'} pages={['Sign-in']} />
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7 xl:p-11">
            <div className="text-center mb-8">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-2">
                Sign In to Your Account
              </h2>
              <p>Welcome back! Please enter your details</p>
            </div>

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
                  placeholder="Enter your email"
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2">
                  Password <span className="text-red">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex justify-between mb-5">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    {...register('remember')}
                    className="w-4 h-4 border border-gray-3 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm">
                    Remember me
                  </label>
                </div>
                <Link href={PATH_FORGOT_PASSWORD} className="text-sm text-blue-700 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-black border py-3 px-6 rounded-lg ease-out duration-200 hover:bg-white hover:text-black"
              >
                Sign In
              </button>

              <p className="text-center mt-6">
                Don't have an account?
                <Link
                  href="/signup"
                  className="text-dark ease-out duration-200 text-blue-700 hover:text-blue-700 pl-2"
                >
                  Sign up Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
