import { PATH_HOME, PATH_ABOUT, PATH_CONTACT, PATH_ALL_PRODUCT } from '@/helpers/Slugs';

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
    image:
      'https://shop.diabetes.org.uk/cdn/shop/products/Amy_Diabetes_Handbag_Black_Lifestyle.jpg?v=1665672088',

    subcategory: [
      {
        path: PATH_HOME,
        title: 'Man',
        displayName: 'Man',
        subsubcategory: [
          {
            path: PATH_HOME,
            title: '1',
            displayName: '1',
          },
          {
            path: PATH_HOME,
            title: '2',
            displayName: '2',
          },
          {
            path: PATH_HOME,
            title: '3',
            displayName: '3',
          },
        ],
      },
      {
        path: PATH_HOME,
        title: 'Women',
        displayName: 'Women',
        subsubcategory: [
          {
            path: PATH_HOME,
            title: '1',
            displayName: '1',
          },
          {
            path: PATH_HOME,
            title: '2',
            displayName: '2',
          },
          {
            path: PATH_HOME,
            title: '3',
            displayName: '3',
          },
        ],
      },
      {
        path: PATH_HOME,
        title: 'new',
        displayName: 'new',
        subsubcategory: [
          {
            path: PATH_HOME,
            title: '1',
            displayName: '1',
          },
          {
            path: PATH_HOME,
            title: '2',
            displayName: '2',
          },
          {
            path: PATH_HOME,
            title: '3',
            displayName: '3',
          },
        ],
      },
    ],
  },
  {
    path: PATH_ALL_PRODUCT,
    title: 'Mens',
    displayName: 'Mens',
    image:
      'https://hips.hearstapps.com/hmg-prod/images/bella-emar-is-seen-wearing-my-essential-wardrobe-vest-na-kd-news-photo-1721744803.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=1120:*',
    subcategory: [
      {
        path: PATH_HOME,
        title: 'Accessories',
        displayName: 'Accessories',
      },
      {
        path: PATH_HOME,
        title: 'Bag',
        displayName: 'Bag',
      },
    ],
  },
  {
    path: PATH_ALL_PRODUCT,
    title: 'Womans',
    displayName: 'Womans',
    image: 'https://www.remelifestyle.in/wp-content/uploads/2019/07/designer-handbag.jpg',
    subcategory: [
      {
        path: PATH_HOME,
        title: 'Handbag',
        displayName: 'Handbag',
      },
      {
        path: PATH_HOME,
        title: 'Bag',
        displayName: 'Bag',
      },
    ],
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
  // {
  //     path: ADMIN_ARTICLES_PATH,
  //     title: "Admin dashboard page link",
  //     displayName: "Articles"
  // },
  // {
  //     path: ADMIN_PROFILE_PATH,
  //     title: "Admin profile page link",
  //     displayName: "Profile"
  // },
];
