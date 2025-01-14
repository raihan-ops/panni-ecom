import React, { useState } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { MenuIcon, ChevronDown, ChevronUp, X } from 'lucide-react';
import { ADMIN_NAVS } from '@/helpers/Navs';

const { Header, Sider, Content } = Layout;

const SubMenu = ({ children, isOpen }) => {
  const menuRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (menuRef.current) {
      const height = menuRef.current.scrollHeight;
      setHeight(height);
    }
  }, [children]);

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? `${height}px` : 0 }}
    >
      <div ref={menuRef}>{children}</div>
    </div>
  );
};

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKey, setOpenKey] = useState(null);
  const [activeKey, setActiveKey] = useState('dashboard');
  const router = useRouter();

  const handleMenuClick = (key, path) => {
    setActiveKey(key);
    if (path) {
      router.push(path);
    }
  };

  const toggleSubmenu = (key, e) => {
    e.stopPropagation();
    setOpenKey(openKey === key ? null : key);
  };

  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => {
      const isOpen = openKey === item.key;
      const hasChildren = item.children && item.children.length > 0;
      const isActive = activeKey === item.key;

      return (
        <div key={item.key} className="relative">
          <div
            className={`
              flex items-center w-full px-3 py-2
              cursor-pointer
              transition-all duration-200
              ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-500/10'}
              ${level > 0 ? 'ml-4' : ''}
              rounded mx-2 my-1
            `}
            onClick={() => !hasChildren && handleMenuClick(item.key, item.path)}
          >
            <div className="flex items-center flex-1">
              {item.icon && (
                <span
                  className={`
                  text-xl
                  ${isActive ? 'text-white' : 'text-gray-400'}
                  transition-colors duration-200
                `}
                >
                  {item.icon}
                </span>
              )}

              {!collapsed && (
                <span
                  className={`
                  ml-3 text-sm font-medium
                  ${isActive ? 'text-white' : 'text-gray-300'}
                  transition-colors duration-200
                `}
                >
                  {item.label}
                </span>
              )}
            </div>

            {hasChildren && !collapsed && (
              <button
                onClick={(e) => toggleSubmenu(item.key, e)}
                className="p-1 hover:bg-blue-500/20 rounded transition-colors duration-200"
              >
                <div
                  className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            )}
          </div>

          {hasChildren && !collapsed && (
            <SubMenu isOpen={isOpen}>{renderMenuItems(item.children, level + 1)}</SubMenu>
          )}
        </div>
      );
    });
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="border-r border-gray-800 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out"
        style={{
          background: '#111827',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={220}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div className="flex items-center">
            <span
              className={`
              text-lg font-semibold text-white
              transition-all duration-300 ease-in-out
              ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
            `}
            >
              {!collapsed && 'Dashboard'}
            </span>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-gray-700 transition-colors duration-200"
          >
            {collapsed ? (
              <MenuIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <X className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        <nav className="mt-4">{renderMenuItems(ADMIN_NAVS)}</nav>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 220,
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        <Header
          className="bg-white h-16 px-6 flex items-center fixed w-full z-10"
          style={{
            left: collapsed ? 80 : 220,
            transition: 'all 0.3s ease-in-out',
            width: `calc(100% - ${collapsed ? 80 : 220}px)`,
          }}
        >
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium text-gray-800">Welcome to panni admin</span>
          </div>
        </Header>

        <Content className="p-6 mt-16 bg-gray-50 min-h-screen">
          <div className="bg-white rounded shadow-sm p-6 min-h-[calc(100vh-theme(space.40))]">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
