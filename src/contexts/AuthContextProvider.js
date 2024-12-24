// @/contexts/AuthContextProvider.js
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '@/helpers/constant';
import { usePathname, useRouter } from 'next/navigation';
import api from '@/providers/Api';
import { PATH_HOME } from '@/helpers/Slugs';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetImage, _setResetImage] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  // useEffect(() => {
  //   const token = isToken();
  //   if (token) {
  //     if (['/login'].includes(pathName)) router.push('/');
  //     getUserProfile();
  //   } else {
  //     setProfileLoading(false);
  //     if (!['/', '/login', '/register'].includes(pathName))
  //       router.push('/login');
  //   }
  // }, [isLogin]);

  const isToken = () => {
    // if (typeof window !== 'undefined') {
    // }
    // return false;
    return localStorage?.getItem(ACCESS_TOKEN) ? true : false;
  };

  // const login = async (body, callback) => {
  //   await api.post({ url: LOGIN_URL, setLoading, body }, (response) => {
  //     localStorage.setItem(ACCESS_TOKEN, response.data.token);
  //     setRole(response.data.user?.role?.alias);
  //     setProfile(response.data.user);
  //     // setIsLogin(true);
  //     callback(response);
  //   });
  // };
  // const forgetPassword = async (body, callback) => {
  //   await api.updateData({ url: FORGET_PASSWORD_URL, setLoading, body }, () => {
  //     callback();
  //   });
  // };
  // const resetPasswordAuth = async (body, callback) => {
  //   await api.post(
  //     { url: RESET_PASSWORD_AUTH_CODE, setLoading, body },
  //     (response) => {
  //       setRole(response.data.user?.role?.alias);
  //       setProfile(response.data.user);
  //       callback();
  //     },
  //   );
  // };

  // const signup = async (body, callback) => {
  //   await api.post({ url: SIGNUP_URL, setLoading, body }, (response) => {
  //     localStorage.setItem(ACCESS_TOKEN, response.data.token);
  //     callback();
  //   });
  // };

  // const otpVerify = async (body, callback) => {
  //   await api.getSingleData(
  //     {
  //       url: `${VERIFY_OTP}?phone=${body.phone}&otp=${body.otp}&type=signup`,
  //       setLoading,
  //     },
  //     (response) => {
  //       localStorage.setItem(ACCESS_TOKEN, response.data.token);
  //       callback();
  //     },
  //   );
  // };

  // const profilePersonalInfoUpdate = async (body) => {
  //   await api.updateData(
  //     {
  //       url: UPDATE_USER_URL,
  //       setLoading: setLoading,
  //       body: body,
  //     },
  //     async () => {
  //       Toast('success', 'Success', 'Profile information update successfully');
  //       getUserProfile();
  //     },
  //   );
  // };
  // const profileUpdateOtpVerify = async (body, callback) => {
  //   await api.getSingleData(
  //     {
  //       url: `${VERIFY_OTP}?phone=${body.phone}&otp=${body.otp}&type=update%20info`,
  //       setLoading,
  //     },
  //     () => {
  //       callback();
  //     },
  //   );
  // };
  // const profileUpdateSendOtp = async (body, callback) => {
  //   await api.getSingleData(
  //     {
  //       url: `${SEND_OTP}?phone=${body}&type=update%20info`,
  //       setLoading,
  //     },
  //     () => {
  //       callback();
  //     },
  //   );
  // };
  // const profileChangePassword = async (body, callback) => {
  //   const newValues = {
  //     currentPassword: body.currentPassword,
  //     newPassword: body.newPassword,
  //   };
  //   await api.updateData(
  //     {
  //       url: CHANGE_PASSWORD_URL,
  //       setLoading: setLoading,
  //       body: newValues,
  //     },
  //     async () => {
  //       Toast('success', 'Success', 'Password changed successfully.');
  //       callback();
  //     },
  //   );
  // };
  // const sellerProfileUpdate = async (body, callback) => {
  //   await api.updateData(
  //     {
  //       url: SELLER_PROFILE_UPDATE,
  //       setLoading,
  //       body,
  //     },
  //     () => {
  //       Toast(
  //         'success',
  //         'profile update',
  //         'seller profile update successfully!',
  //       );
  //       callback();
  //       getUserProfile();
  //     },
  //   );
  // };
  // const sendOtp = async (body, callback) => {
  //   await api.getSingleData(
  //     {
  //       url: `${SEND_OTP}?phone=${body}&type=signup`,
  //       setLoading,
  //     },
  //     (response) => {
  //       localStorage.setItem(ACCESS_TOKEN, response.data.token);
  //       if (callback) {
  //         callback();
  //       }
  //     },
  //   );
  // };
  // const sendForgetPasswordOtp = async (body, callback) => {
  //   await api.getSingleData(
  //     {
  //       url: `${SEND_OTP}?phone=${body}&type=forgotPassword`,
  //       setLoading,
  //     },
  //     (response) => {
  //       localStorage.setItem(ACCESS_TOKEN, response.data.token);
  //       if (callback) {
  //         callback();
  //       }
  //     },
  //   );
  // };
  // const otpVerifyForgetPassword = async (body, callback) => {
  //   await api.getSingleData(
  //     {
  //       url: `${VERIFY_OTP}?phone=${body.phone}&otp=${body.otp}&type=forgotPassword`,
  //       setLoading,
  //     },
  //     () => {
  //       callback();
  //     },
  //   );
  // };

  // const getUserProfile = async () => {
  //   const errorHandle = () => {
  //     logout();
  //   };
  //   api.getSingleData(
  //     {
  //       url: USER_PROFILE_API_URL,
  //       setLoading: setProfileLoading,
  //       errorHandle: () => errorHandle(),
  //     },
  //     (response) => {
  //       setProfile(response.data);
  //       setIsLogin(true);
  //     },
  //   );
  // };

  const onRedirectionPage = () => {
    if (router.query && router.query.redirectTo) {
      const { redirectTo } = router.query;
      if (redirectTo && typeof redirectTo === 'string') {
        router.push(redirectTo);
      } else {
        router.push(PATH_HOME);
      }
    } else {
      router.push(PATH_HOME);
    }
  };

  const logout = () => {
    setIsLogin(false);
    setProfile(null);
    localStorage.clear();
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        profile,
        setProfile,
        loading,
        profileLoading,
        role,
        permissions: profile ? profile.permissions : [],
        logout,
        // getUserProfile,
        // signup,
        // forgetPassword,
        resetPassword,
        setResetPassword,
        // resetPasswordAuth,
        // otpVerify,
        // sendOtp,
        // profileUpdateOtpVerify,
        // profileUpdateSendOtp,
        // sellerProfileUpdate,
        // profilePersonalInfoUpdate,
        // profileChangePassword,
        // sendForgetPasswordOtp,
        // otpVerifyForgetPassword,
        onRedirectionPage,
        isToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
