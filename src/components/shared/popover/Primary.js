import { Popover } from 'antd';
import React from 'react';

const Primary = ({ content, className = '', title = '', children }) => {
  return (
    <Popover
      placement="bottom"
      className={className}
      content={content}
      title={title}
      trigger="hover"
    >
      {children}
    </Popover>
  );
};

export default Primary;
