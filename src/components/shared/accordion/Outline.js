import { Collapse } from 'antd';
import React from 'react';

const Outline = ({ items }) => {
  return (
    <div>
      <Collapse defaultActiveKey={['1']} expandIconPosition="end" items={items} />
    </div>
  );
};

export default Outline;
