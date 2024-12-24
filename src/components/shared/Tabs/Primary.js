'use client';
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { twMerge } from 'tailwind-merge';

const renderTabBar = (
  props,
  DefaultTabBar,
  { tabBarClassName = 'my-4', tabBarUnderLine = true },
) => {
  const { panes, activeKey, onTabClick } = props;
  const modifiedPaned = panes?.map((data) => {
    const _data = {
      tab: data?.props?.tab,
      tabKey: data?.props?.tabKey,
    };
    return _data;
  });
  return (
    <div className={twMerge('', tabBarClassName)}>
      <div className="flex flex-wrap gap-[10px]">
        {modifiedPaned?.map((item) => (
          <button
            key={item?.tabKey}
            onClick={(e) => onTabClick(item.tabKey, e)}
            className={`${
              activeKey === item.tabKey
                ? 'border-primary bg-primary text-white !outline-none font-medium'
                : 'bg-white text-black font-medium'
            } border-[2px] border-opacity-60 border-athens_gray-100 leading-6 text-md  rounded-xl block py-4 px-8 transition-all duration-300 ease-in-out hover:bg-primary hover:border-primary hover:text-white`}
          >
            {item.tab}
          </button>
        ))}
      </div>
    </div>
  );
};

const Primary = ({
  items = [],
  defaultActiveKey = 0,
  tabBarClassName,
  tabBarUnderLine,
  ...props
}) => {
  return (
    <Tabs
      {...props}
      items={items}
      defaultActiveKey={defaultActiveKey}
      renderTabBar={(props, DefaultTabBar) =>
        renderTabBar(props, DefaultTabBar, { tabBarClassName, tabBarUnderLine })
      }
    />
  );
};

Primary.propTypes = {
  defaultActiveKey: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      children: PropTypes.node.isRequired,
    }),
  ).isRequired,
};

export default Primary;
