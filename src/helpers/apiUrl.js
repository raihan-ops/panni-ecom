export const ROOT_URL = 'http://192.168.0.109:7001';
// export const ROOT_URL = 'https://5621-220-247-128-71.ngrok-free.app';
const API_VERSION = '/api/1.0.0';
export const API_URL = `${ROOT_URL}${API_VERSION}`;

// User
export const USER_OTP_VERIFY_API_URL = `${API_URL}/client/verify-account`;
export const USER_OTP_RESEND_API_URL = `${API_URL}/client/resend-otp`;

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
