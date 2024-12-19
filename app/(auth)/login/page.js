'use client';

import Link from 'next/link';
import { PATH_FORGOT_PASSWORD, PATH_REGISTER } from '@/helpers/Slugs';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import BaseForm from '@/components/form/BaseForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useLoginFormItems from '@/app/(auth)/login/hoc/useLoginFormItems';
import { useAuthContext } from '@/contexts/AuthContextProvider';
import Img from '@/components/shared/Img';
import assets from '@/assets/asset';
import { Icons } from '@/assets/icons';
import AuthFooter from '@/components/pages/auth/AuthFooter';
import api from '@/providers/Api';
import { USER_LOGIN_API_URL } from '@/helpers/apiUrl';

const Login = () => {
  const formItems = useLoginFormItems();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // const { setProfile, onRedirectionPage, setIsLogin } = useAuthContext();
  const handleSubmit = async (form) => {
    try {
      await form.validateFields();
      const value = form.getFieldsValue(true);

      api.post(
        {
          url: USER_LOGIN_API_URL,
          body: value,
          setLoading: setIsLoading,
        },
        (res) => {
          // localStorage.setItem(ACCESS_TOKEN, res?.data?.token?.access);
          // setProfile(res.data.user);
          // setIsLogin(true);
          // onRedirectionPage();
        },
      );
    } catch (error) {
      console.log('Form validation failed:', error);
    }
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="image w-[860px] 2xl:w-[800px] h-[922px] 2xl:h-[850px] p-4">
        <Img src={assets.LoginCar} className="w-full h-full  rounded-2xl" alt="image"></Img>
      </div>
      <div className="form px-32 2xl:px-20 mt-10">
        <div className="">
          <Icons.Logo></Icons.Logo>
        </div>

        <div className="flex flex-col justify-around h-full">
          <div className=" mt-10 w-[592px]">
            <Typography.SubHeading className=" w-full text-neutral text-[32px] leading-10">
              Welcome to Otonest!
            </Typography.SubHeading>
            <div className="mt-1">
              <Typography.Text className="w-full text-neutral opacity-60 font-medium text-base leading-6 ">
                Use your credentials to access
              </Typography.Text>
            </div>
            <div className="mt-8">
              <BaseForm
                formItems={formItems}
                renderExtraSection={(form) => (
                  <div>
                    <div className="w-full  mt-[-10px]">
                      <Link href={PATH_FORGOT_PASSWORD} className="cursor-pointer">
                        <Typography.Text className="text-neutral text-xxs">
                          Forgot Password
                        </Typography.Text>
                      </Link>
                    </div>
                    <div>
                      <Button.Gradient
                        className="w-full mt-9 h-fit"
                        type="primary"
                        onClick={() => handleSubmit(form)}
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        <span className="py-[10px]">Continue</span>
                      </Button.Gradient>
                    </div>

                    <div className="flex mt-2 items-baseline">
                      <Typography.Text className="text-neutral font-medium text-xs ">
                        {'Don’t have an account?'}
                      </Typography.Text>
                      <Link href={PATH_REGISTER} className="cursor-pointer ml-1">
                        <Typography.Text className="text-primary-text font-bold text-xs ">
                          Sign Up
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

export default Login;
