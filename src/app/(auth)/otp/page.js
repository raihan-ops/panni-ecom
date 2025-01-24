'use client';
import React, { useState } from 'react';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import BaseForm from '@/components/form/BaseForm';
import useFormItems from './hoc/useOtpFormItems';

import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/providers/Api';
import { Toast } from '@/components/shared/toast/Toast';
import { USER_OTP_RESEND_API_URL, USER_OTP_VERIFY_API_URL } from '@/helpers/apiUrl';
import { PATH_HOME } from '@/helpers/Slugs';
import { Icons } from '@/assets/icons';

const OTP = () => {
  const formItems = useFormItems();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (form) => {
    try {
      await form.validateFields();
      const value = form.getFieldsValue(true);
      api.post(
        {
          url: `${USER_OTP_VERIFY_API_URL}`,
          body: {
            otp: value.otp,
            email: email,
          },
          setLoading: setIsLoading,
        },
        (res) => {
          router.push(PATH_HOME);
          Toast('success', 'Registration successful', '');
        },
      );
    } catch (error) {
      console.log('Form validation failed:', error);
    }
  };

  const resendOtpApiCall = () => {
    api.post(
      {
        url: `${USER_OTP_RESEND_API_URL}`,
        body: {
          email: email,
        },
        setLoading: setIsLoading,
      },
      (res) => {
        Toast('success', 'Resend OTP successful', '');
      },
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[416px] flex flex-col justify-center items-center  ">
        <div className="mt-[64px]">
          <Icons.Logo />
        </div>

        <div className="mt-40">
          <Typography.SubHeading className="text-center w-full text-neutral text-[28px] leading-9">
            SMS Verification phone number
          </Typography.SubHeading>
          <div className="mt-2">
            <Typography.Text className=" w-full text-neutral opacity-60 font-medium text-sm leading-[20px]">
              We have you send an 6 digits one-time password(OTP) on this mobile number, verify to
              continue sign up
            </Typography.Text>
          </div>
          <div className="mt-[96px] w-full">
            <BaseForm
              formItems={formItems}
              renderExtraSection={(form) => (
                <div>
                  <Typography.Text className="text-sm font-normal leading-[20px] text-athens_gray-500">
                    Didn’t receive the OTP?
                    <span
                      className="font-medium ms-2 cursor-pointer"
                      onClick={() => resendOtpApiCall()}
                    >
                      Resend
                    </span>
                  </Typography.Text>
                  <Button.Gradient
                    className="w-full mt-8 text-white h-fit"
                    onClick={() => handleSubmit(form)}
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    <span className="py-[10px]"> Verify OTP</span>
                  </Button.Gradient>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
