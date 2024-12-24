import { Collapse } from 'antd';
import React from 'react';

const Primary = ({ items }) => {
  return (
    <div>
      <Collapse defaultActiveKey={['1']} ghost items={items} />
    </div>
  );
};

export default Primary;
