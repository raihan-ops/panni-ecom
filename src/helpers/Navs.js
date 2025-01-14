import {
  PATH_HOME,
  PATH_ABOUT,
  PATH_CONTACT,
  PATH_ALL_PRODUCT,
  ADMIN_DASHBOARD_PATH,
  ADMIN_PRODUCTS_PATH,
} from '@/helpers/Slugs';
import { MinusOutlined } from '@ant-design/icons';

export const MAIN_NAV_ITEMS = [
  {
    path: PATH_HOME,
    title: 'Home',
    displayName: 'Home',
  },
  {
    path: PATH_ALL_PRODUCT,
    title: 'New-Arrivals',
    displayName: 'New Arrivals',
  },
  {
    path: PATH_ALL_PRODUCT,
    title: 'Mens',
    displayName: 'Mens',
  },
  {
    path: PATH_ALL_PRODUCT,
    title: 'Womans',
    displayName: 'Womans',
  },
  {
    path: PATH_ABOUT,
    title: 'About',
    displayName: 'About',
  },
  {
    path: PATH_CONTACT,
    title: 'Contact',
    displayName: 'Contact',
  },
];

export const ADMIN_NAVS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    // onClick: () => handleClick(PATH.DASHBOARD_PATH),
    path: ADMIN_DASHBOARD_PATH,
    icon: <MinusOutlined className="text-base" />,
    children: null,
    // permissions: [Permission.ALL],
  },

  {
    key: 'Stores',
    label: 'Stores',
    // onClick: () => handleClick(PATH.DASHBOARD_PATH),
    icon: <MinusOutlined className="text-base" />,
    // permissions: [Permission.ALL],
    children: [
      {
        key: 'Products',
        label: 'Products',
        path: ADMIN_PRODUCTS_PATH,
        // onClick: () => handleClick(PATH.PRODUCT_LIST_PATH),
        icon: <MinusOutlined className="text-base" />,
        children: null,
        // permissions: [Permission.READ_USERS],
      },
    ],
  },
  {
    key: 'config',
    label: 'configuration',
    // onClick: () => handleClick(PATH.DASHBOARD_PATH),
    icon: <MinusOutlined className="text-base" />,
    // permissions: [Permission.ALL],
    children: [
      {
        key: 'Site configuration',
        label: 'Site configuration',
        path: ADMIN_PRODUCTS_PATH,
        // onClick: () => handleClick(PATH.PRODUCT_LIST_PATH),
        icon: <MinusOutlined className="text-base" />,
        children: null,
        // permissions: [Permission.READ_USERS],
      },
    ],
  },
];
