// 'use client';
// import BaseForm from '@/components/form/BaseForm';
// import { Button } from '@/components/shared/button';
// import { Typography } from '@/components/shared/typography';
// import React, { useState } from 'react';
// import useFormItems from './hooks/useResetPassFormItems';
// import api from '@/providers/Api';
// import { USER_PASSWORD_RESET_API_URL } from '@/helpers/apiUrl';
// import { useRouter } from 'next/navigation';

const ResetPassword = () => {
  //   const formItems = useFormItems();
  //   const router = useRouter();
  //   const [isLoading, setIsLoading] = useState(false);
  //   const handleSubmit = async (form) => {
  //     try {
  //       await form.validateFields();
  //       const value = form.getFieldsValue(true);

  //       api.post(
  //         {
  //           url: USER_PASSWORD_RESET_API_URL,
  //           body: value,
  //           setLoading: setIsLoading,
  //         },
  //         (res) => {

  //         },
  //       );
  //     } catch (error) {
  //       console.log('Form validation failed:', error);
  //     }
  //   };

  //   const onChange = (e) => {
  //     console.log(`checked = ${e.target.checked}`);
  //   };

  return (
    <div className="w-full">
      {/* <Typography.SubHeading className="text-center w-full">
        Reset Password
      </Typography.SubHeading>
      <Typography.Text className="text-center w-full">
        Enter a new password to reset your current password.
      </Typography.Text>
      <div className="px-10 pt-10">
        <BaseForm
          formItems={formItems}
          renderExtraSection={(form) => (
            <div>
              <div>
                <Button.Primary
                  className="w-full"
                  type="primary"
                  onClick={() => handleSubmit(form)}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Create New Password
                </Button.Primary>
              </div>
            </div>
          )}
        />
      </div> */}
    </div>
  );
};

export default ResetPassword;
