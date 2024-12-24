export const ROOT_URL = 'https://otonest-backend.bookcryptbpo.com';
const API_VERSION = '/api';
export const API_URL = `${ROOT_URL}${API_VERSION}`;
// export const API_URL_PUBLIC = `${ROOT_URL}${API_VERSION}/public`;
// export const API_URL_SECURE = `${ROOT_URL}${API_VERSION}/secured`;

// User
export const USER_LOGIN_API_URL = `${API_URL}/client/login`;
export const USER_UPDATE_PROFILE_API_URL = `${API_URL}/client/update-profile`;
export const USER_REGISTER_API_URL = `${API_URL}/client/registration-post`;
export const USER_UPDATE_API_URL = `${API_URL}/client/update`;
export const USER_FORGOT_PASSWORD_API_URL = `${API_URL}/client/request/reset-password-by-email`;
export const USER_PASSWORD_RESET_API_URL = `${API_URL}/client/password/reset`;
export const USER_PASSWORD_UPDATE_API_URL = `${API_URL}/client/password/update`;
export const USER_OTP_VERIFY_API_URL = `${API_URL}/client/verify-account`;
export const USER_OTP_RESEND_API_URL = `${API_URL}/client/resend-otp`;

// sections
export const GET_ALL_SECTIONS_API_URL = `${API_URL}/sections`;

// Settings
export const GET_SETTINGS_API_URL = `${API_URL}/settings`;

// export const GET_ALL_BUNDLE_API_URL = `${API_URL_PUBLIC}/bundles`;
// export const GET_ALL_BUNDLE_HOMEPAGE_API_URL = `${API_URL_PUBLIC}/bundles/for-homepage`;
// export const GET_BUNDLE_API_URL = `${API_URL_PUBLIC}/bundles/id`;
