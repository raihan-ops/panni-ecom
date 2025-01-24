// useFilterItems.js

const useFormItems = () => {
  const formItems = [
    {
      label: 'Email',
      name: 'email',
      type: 'input',
      className: 'col-span-12',
      placeholder: 'Enter user email',
      rules: [{ required: true, message: 'Please input your email!' }],
    },
  ];
  return formItems;
};

export default useFormItems;
