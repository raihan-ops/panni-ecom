export const ROOT_URL = 'http://localhost:7001';
const API_VERSION = '/api/1.0.0';
export const API_URL = `${ROOT_URL}${API_VERSION}`;

// User
export const USER_OTP_VERIFY_API_URL = `${API_URL}/client/verify-account`;
export const USER_OTP_RESEND_API_URL = `${API_URL}/client/resend-otp`;

// sections
export const GET_ALL_SECTIONS_API_URL = `${API_URL}/sections`;

/* ========== Public ============*/

//banner
export const GET_ALL_BANNERS = `${API_URL}/banners`;

// categories
export const GET_ALL_SUB_CATEGORIES = `${API_URL}/sub-categories`;

// products
export const GET_ALL_PRODUCTS = `${API_URL}/products`;
