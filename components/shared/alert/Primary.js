import { Alert } from 'antd';
import React from 'react';

const Primary = ({ message, description, type, showIcon, closable }) => {
  return (
    <Alert
      message={message}
      description={description}
      type={type}
      showIcon={showIcon}
      closable={closable}
    />
  );
};

export default Primary;
