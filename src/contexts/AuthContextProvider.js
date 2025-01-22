// @/contexts/AuthContextProvider.js
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '@/helpers/constant';
import { usePathname, useRouter } from 'next/navigation';
import api from '@/providers/Api';
import { PATH_HOME } from '@/helpers/Slugs';
import { Toast } from '@/components/shared/toast/Toast';
import {
  CHANGE_PASSWORD_URL,
  FORGET_PASSWORD_URL,
  LOGIN_URL_API_URL,
  RESEND_OTP_API_URL,
  RESET_PASSWORD_AUTH_CODE,
  SEND_OTP,
  SIGNUP_URL,
  USER_OTP_VERIFY_API_URL,
  USER_PROFILE_API_URL,
  VERIFY_OTP,
} from '@/helpers/apiUrl';
import { protectedRoutes } from '@/helpers/constant';

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

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      document.cookie = `${ACCESS_TOKEN}=${token}; path=/`;
      getUserProfile();
    } else {
      setProfileLoading(false);
      document.cookie = `${ACCESS_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

      const isProtectedPath = protectedRoutes.some((route) => pathName.startsWith(route));

      if (isProtectedPath) {
        router.push(`/login?redirectTo=${pathName}`);
      }
    }
  }, [pathName]);

  const loginHandler = async (body, callback) => {
    await api.post({ url: LOGIN_URL_API_URL, setLoading, body }, (response) => {
      const token = response.data.token.access;
      localStorage.setItem(ACCESS_TOKEN, token);
      document.cookie = `${ACCESS_TOKEN}=${token}; path=/`;

      setRole(response.data.user?.role?.alias);
      setProfile(response.data.user);
      setIsLogin(true);

      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get('redirectTo');
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push(PATH_HOME);
      }
      Toast('success', 'Success', ' Login successfully.');

      callback(response);
    });
  };

  const forgotPasswordHandler = async (body, callback) => {
    await api.post({ url: `${FORGET_PASSWORD_URL}?email=${body}`, setLoading }, (res) => {
      Toast('success', 'Success', 'Otp has been send successfully.');
      callback(res);
    });
  };
  const resetPasswordAuth = async (body, callback) => {
    await api.post({ url: RESET_PASSWORD_AUTH_CODE, setLoading, body }, (response) => {
      setRole(response.data.user?.role?.alias);
      setProfile(response.data.user);
      callback();
    });
  };

  const signupHandler = async (body, callback) => {
    await api.post({ url: SIGNUP_URL, setLoading, body }, (response) => {
      // localStorage.setItem(ACCESS_TOKEN, response.data.token);
      callback(response);
    });
  };

  const otpVerify = async (body, callback) => {
    await api.post(
      {
        url: `${VERIFY_OTP}?email=${body.email}&code=${body.otp}`,
        setLoading,
      },
      (response) => {
        localStorage.setItem(ACCESS_TOKEN, response.data.token.access);
        callback();
      },
    );
  };

  const forgotOtpVerify = async (body, callback) => {
    await api.post(
      {
        url: `${USER_OTP_VERIFY_API_URL}?email=${body.email}&code=${body.otp}`,
        setLoading,
      },
      (response) => {
        // localStorage.setItem(ACCESS_TOKEN, response.data.token.access);
        callback(response);
      },
    );
  };

  const profileChangePassword = async (body, callback) => {
    const newValues = {
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    };
    await api.updateData(
      {
        url: CHANGE_PASSWORD_URL,
        setLoading: setLoading,
        body: newValues,
      },
      async () => {
        Toast('success', 'Success', 'Password changed successfully.');
        callback();
      },
    );
  };

  const resendSendOtp = async (body, callback) => {
    await api.post(
      {
        url: `${RESEND_OTP_API_URL}?email=${body}`,
        setLoading,
      },
      (response) => {
        // localStorage.setItem(ACCESS_TOKEN, response.data.token);
        Toast('success', 'Success', 'Otp has been send successfully.');
        if (callback) {
          callback();
        }
      },
    );
  };
  const resetPasswordHandler = async (body, callback) => {
    await api.post(
      {
        url: `${CHANGE_PASSWORD_URL}?email=${body.email}&code=${body.otp}`,
        setLoading,
        body: {
          newPassword: body.newPassword,
        },
      },
      (response) => {
        // localStorage.setItem(ACCESS_TOKEN, response.data.token.access);
        Toast('success', 'Success', 'Password changed successfully.');
        if (callback) {
          callback(response);
        }
      },
    );
  };

  const getUserProfile = async () => {
    const errorHandle = () => {
      logout();
    };
    api.getSingleData(
      {
        url: USER_PROFILE_API_URL,
        setLoading: setProfileLoading,
        errorHandle: () => errorHandle(),
      },
      (response) => {
        setProfile(response.data.info);
        setIsLogin(true);
      },
    );
  };

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
    document.cookie = `${ACCESS_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    // router.push('/login');
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
        signupHandler,
        resetPassword,
        setResetPassword,
        otpVerify,
        loginHandler,
        onRedirectionPage,
        resendSendOtp,
        forgotPasswordHandler,
        forgotOtpVerify,
        resetPasswordHandler,
        isToken: () => (localStorage.getItem(ACCESS_TOKEN) ? true : false),
        isProtectedRoute: (path) => protectedRoutes.some((route) => path.startsWith(route)),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
