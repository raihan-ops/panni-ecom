// export const ROOT_URL = 'http://192.168.0.109:7001';
export const ROOT_URL = 'http://localhost:7001';
// export const ROOT_URL = 'https://5621-220-247-128-71.ngrok-free.app';
const API_VERSION = '/api/1.0.0';
export const API_URL = `${ROOT_URL}${API_VERSION}`;

// User
export const USER_OTP_VERIFY_API_URL = `${API_URL}/client/verify-account`;
export const USER_OTP_RESEND_API_URL = `${API_URL}/client/resend-otp`;
export const LOGIN_URL_API_URL = `${API_URL}/auth/customers/login`;
export const FORGET_PASSWORD_URL = ``;
export const RESET_PASSWORD_AUTH_CODE = ``;
export const SIGNUP_URL = `${API_URL}/auth/customers/sign-up/by-email`;
export const VERIFY_OTP = `${API_URL}/auth/customers/login`;
export const CHANGE_PASSWORD_URL = ``;
export const SEND_OTP = ``;
export const USER_PROFILE_API_URL = ``;

// sections
export const GET_ALL_SECTIONS_API_URL = `${API_URL}/sections`;

/* ========== Public ============*/

//Navbar
export const GET_NAVBAR_CATEGORIES_NEW_ARRIVAL = `${API_URL}/categories/type/NEW_ARRIVAL`;
export const GET_NAVBAR_CATEGORIES_MEN = `${API_URL}/categories/type/MEN`;
export const GET_NAVBAR_CATEGORIES_WOMEN = `${API_URL}/categories/type/WOMEN`;

//banner
export const GET_ALL_BANNERS = `${API_URL}/banners`;

// categories
export const GET_ALL_SUB_CATEGORIES = `${API_URL}/sub-categories`;

// products
export const GET_ALL_PRODUCTS = `${API_URL}/products`;

//colors
export const GET_ALL_PRODUCT_COLORS = `${API_URL}/product-colors`;
