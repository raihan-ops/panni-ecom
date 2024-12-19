'use client';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const renderTabBar = (
  props,
  DefaultTabBar,
  { tabBarClassName = 'my-3', tabBarUnderLine = true },
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
      <div className="flex flex-wrap gap-2">
        {modifiedPaned?.map((item) => (
          <button
            key={item?.tabKey}
            onClick={(e) => onTabClick(item.tabKey, e)}
            className={`${
              activeKey === item.tabKey ? 'border-midnight-950 text-midnight-950 opacity-100' : ''
            } px-[20px] py-[10px] -mb-[1px] border-[2px] opacity-60 border-athens_gray-100 block rounded-[34px] font-medium text-base 
            transition-all duration-300 ease-in-out
            hover:text-midnight-950 hover:border-midnight-950 hover:opacity-100`}
          >
            {item.tab}
          </button>
        ))}
      </div>
    </div>
  );
};

const Outline = ({
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

Outline.propTypes = {
  defaultActiveKey: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      children: PropTypes.node.isRequired,
    }),
  ).isRequired,
};

export default Outline;
