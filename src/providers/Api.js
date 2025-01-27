import { Toast } from '@/components/shared/toast/Toast';
import { ACCESS_TOKEN } from '@/helpers/constant';
import axios from 'axios';

const api = {
  getAllData: ({ url, setLoading, params }, next) =>
    apiCall({ url, setLoading, params, method: 'get' }, next),
  getSingleData: ({ url, setLoading, params, errorHandle }, next) =>
    apiCall({ url, setLoading, params, method: 'get', errorHandle }, next),
  post: ({ url, setLoading, body, onErrorHandle }, next) =>
    apiCall({ url, setLoading, body, method: 'post', onErrorHandle }, next),
  updateData: ({ url, setLoading, body }, next) =>
    apiCall({ url, setLoading, body, method: 'put' }, next),
  deleteData: ({ url, setLoading }, next) => apiCall({ url, setLoading, method: 'delete' }, next),

  nexAction: (response, callback) => {
    if (response) {
      callback();
    }
  },
};

const apiCall = async (
  { setLoading, url, body, params, method, errorHandle, onErrorHandle },
  next,
) => {
  const getAuthHeader = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return { headers: { Authorization: `Bearer ${accessToken}` } };
  };

  const axiosCall = () => {
    if (['post', 'put'].includes(method)) {
      return axios[method](url, body, { ...getAuthHeader(), params });
    } else {
      return axios[method](url, {
        ...getAuthHeader(),
        params,
      });
    }
  };

  try {
    setLoading(true);
    const response = await axiosCall();
    next(response);
    setLoading(false);
    return response;
  } catch (error) {
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN);
    }
    console.log('Getting error', error);
    errorHandle && errorHandle(error);
    onErrorHandle && onErrorHandle(error);
    setLoading(false);
    const _error = error?.response?.data?.message;
    if (_error) {
      // Extract error messages from the error response
      // const errorMessages = Object.values(_error.errors).flat().join(', ');
      Toast('error', 'Error', _error);
    } else {
      Toast('error', 'Error', 'An unexpected error occurred.');
    }
  }
};

export default api;
