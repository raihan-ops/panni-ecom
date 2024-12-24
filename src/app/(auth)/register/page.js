'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useRegisterFormItems from './hoc/useRegisterFormItems';
import Img from '@/components/shared/Img';
import assets from '@/assets/asset';
import { Icons } from '@/assets/icons';
import { Typography } from '@/components/shared/typography';
import BaseForm from '@/components/form/BaseForm';
import { Button } from '@/components/shared/button';
import Link from 'next/link';
import { PATH_LOGIN, PATH_OTP_VERIFY } from '@/helpers/Slugs';
import AuthFooter from '@/components/pages/auth/AuthFooter';
import api from '@/providers/Api';
import { USER_REGISTER_API_URL } from '@/helpers/apiUrl';
import { Toast } from '@/components/shared/toast/Toast';

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formItems = useRegisterFormItems();

  const handleSubmit = async (form) => {
    try {
      await form.validateFields();
      const value = form.getFieldsValue(true);

      // if (value?.password !== value?.passwordConfirm) {
      // }

      api.post(
        {
          url: USER_REGISTER_API_URL,
          body: value,
          setLoading: setIsLoading,
        },
        (res) => {
          Toast('success', res?.data?.message, '');
          router.push(`${PATH_OTP_VERIFY}?email=${res?.data?.data?.customer_email}`);
        },
      );
    } catch (error) {
      console.log('Form validation failed:', error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="image w-[860px] 2xl:w-[800px] h-[922px] 2xl:h-[850px] p-4">
        <Img src={assets.SignUpHonda} className="w-full h-full rounded-2xl" alt="image" />
      </div>
      <div className="form px-32 2xl:px-20 mt-10">
        <div className="">
          <Icons.Logo />
        </div>

        <div className="flex flex-col justify-around h-full">
          <div className=" mt-10 w-[592px]">
            <Typography.SubHeading className=" w-full text-neutral text-[32px] leading-10">
              Create an Otonest account
            </Typography.SubHeading>
            <div className="mt-1">
              <Typography.Text className="w-full text-neutral opacity-60 font-medium text-base leading-6 ">
                Enter your credentials to sign up
              </Typography.Text>
            </div>
            <div className="mt-8">
              <BaseForm
                formItems={formItems}
                renderExtraSection={(form) => (
                  <div>
                    <div>
                      <Button.Gradient
                        className="w-full mt-3 h-fit"
                        type="primary"
                        onClick={() => handleSubmit(form)}
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        <span className="py-[10px]">Create Account</span>
                      </Button.Gradient>
                    </div>

                    <div className="flex mt-2 items-baseline">
                      <Typography.Text className="text-neutral font-medium text-xs ">
                        {'Already have an account?'}
                      </Typography.Text>
                      <Link href={PATH_LOGIN} className="cursor-pointer ml-1">
                        <Typography.Text className="text-primary-text font-bold text-xs ">
                          Login
                        </Typography.Text>
                      </Link>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Footer */}
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};

export default Register;
