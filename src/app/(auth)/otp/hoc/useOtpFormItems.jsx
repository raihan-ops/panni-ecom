// useFilterItems.js

const useFormItems = () => {
  const formItems = [
    {
      name: 'otp',
      type: 'otp',
      className: 'col-span-12 ',
      rules: [{ required: true, message: 'Please input your otp!' }],
    },
  ];
  return formItems;
};

export default useFormItems;
