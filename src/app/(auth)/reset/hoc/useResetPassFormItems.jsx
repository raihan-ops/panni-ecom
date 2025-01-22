// useFilterItems.js

const useFormItems = () => {
  const formItems = [
    {
      label: 'New Password',
      name: 'newPassword',
      type: 'password',
      className: 'col-span-12',
      placeholder: 'Enter your password',
      rules: [{ required: true, message: 'Please input your password!' }],
    },
    {
      label: 'Confirm New Password',
      name: 'confirmPassword',
      type: 'password',
      className: 'col-span-12',
      placeholder: 'Enter your password',
      rules: [{ required: true, message: 'Please input your password!' }],
    },
  ];
  return formItems;
};

export default useFormItems;
