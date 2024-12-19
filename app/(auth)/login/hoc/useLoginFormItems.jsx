// useFilterItems.js

const useLoginFormItems = () => {
  return [
    {
      label: 'Email',
      name: 'email',
      type: 'input',
      className: 'col-span-12',
      placeholder: 'Enter your email address',
      rules: [{ required: true, message: 'Please input your email!' }],
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      className: 'col-span-12',
      placeholder: 'Enter your password',
      rules: [{ required: true, message: 'Please input your password!' }],
    },
  ];
};

export default useLoginFormItems;
