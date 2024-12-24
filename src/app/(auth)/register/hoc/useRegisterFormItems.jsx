// useFilterItems.js

const useRegisterFormItems = () => {
  return [
    {
      label: 'Full Name',
      name: 'name',
      type: 'input',
      className: 'col-span-12',
      placeholder: 'Enter full name',
      rules: [{ required: true, message: 'Please input your full name!' }],
    },
    {
      label: 'Email',
      name: 'email',
      type: 'input',
      className: 'col-span-12',
      placeholder: 'Enter your email',
      rules: [{ required: true, message: 'Please input email!' }],
    },

    {
      label: 'Phone Number',
      name: 'mobile',
      type: 'input',
      className: 'col-span-12',
      placeholder: 'Enter your phone number',
      rules: [{ required: true, message: 'Please input phone number!' }],
    },

    {
      label: 'Password',
      name: 'password',
      type: 'password',
      className: 'col-span-12',
      placeholder: 'Enter user password',
      rules: [{ required: true, message: 'Please input user password!' }],
      // extra: 'Between 8 and 10 characters',
    },
    {
      label: 'Confirm Password',
      name: 'password_confirmation',
      type: 'password',
      className: 'col-span-12',
      placeholder: 'Confirm password',
      rules: [
        { required: true, message: 'Please confirm password!' },
        // Custom validation to check if confirm password matches the password
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              // eslint-disable-next-line no-undef
              return Promise.resolve();
            }
            // eslint-disable-next-line no-undef
            return Promise.reject(new Error('Passwords do not match!'));
          },
        }),
      ],
      // extra: 'Between 8 and 10 characters',
    },
    {
      checkboxLabel: "I'd like to receive exclusive offers and promotions via SMS",
      name: 'promotionsOptIn',
      type: 'checkbox',
      className: 'col-span-12',
      valuePropName: 'checked', // Ensures the field value is boolean (true/false)
      initialValue: false, // Default unchecked
    },
  ];
};

export default useRegisterFormItems;
