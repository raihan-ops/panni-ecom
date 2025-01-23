// export const ROOT_URL = 'http://192.168.0.109:7001';
export const ROOT_URL = 'http://localhost:7001';
// export const ROOT_URL = 'https://5621-220-247-128-71.ngrok-free.app';
const API_VERSION = '/api/1.0.0';
export const API_URL = `${ROOT_URL}${API_VERSION}`;

// User
export const USER_OTP_VERIFY_API_URL = `${API_URL}/customers/verify/otp`;
export const USER_OTP_RESEND_API_URL = `${API_URL}/client/resend-otp`;
export const LOGIN_URL_API_URL = `${API_URL}/auth/customers/login`;
export const FORGET_PASSWORD_URL = `${API_URL}/customers/request/reset-password-by-email`;
export const RESET_PASSWORD_AUTH_CODE = `${API_URL}/customers/verify/forget-password`;
export const SIGNUP_URL = `${API_URL}/auth/customers/sign-up/by-email`;
export const VERIFY_OTP = `${API_URL}/customers/verify/email-verification`;
export const CHANGE_PASSWORD_URL = `${API_URL}/customers/verify/forget-password`;
export const SEND_OTP = ``;
export const USER_PROFILE_API_URL = `${API_URL}/secured/users/profile`;
export const RESEND_OTP_API_URL = `${API_URL}/auth/resend-otp/by-email`;

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
export const GET_PRODUCT_BY_SLUG = `${API_URL}/products/slug`;
export const GET_RELETED_PRODUCTS = `${API_URL}/products/get-related/id`;

//colors
export const GET_ALL_PRODUCT_COLORS = `${API_URL}/product-colors`;

//offer
export const GET_ACTIVE_OFFER = `${API_URL}/active-offer`;

// cart
export const UPDATE_CART_API = `${API_URL}/secured/carts/update`;
export const GET_CART_API = `${API_URL}/secured/carts/get-customer-cart`;
export const CLEAR_CART_API = `${API_URL}/secured/carts/clear`;
