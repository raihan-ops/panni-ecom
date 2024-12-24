import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import Permission from './Permission';
import { PATH_HOME } from './Slugs';

// import { createIntl, createIntlCache } from 'react-intl';

export const onValidateForm = async (form) => {
  try {
    await form.validateFields();
    return form.getFieldsValue(true);
  } catch (error) {
    console.log('Form validation failed:', error);
  }
};

export const getErrorMessage = (error) => {
  if (error.response) {
    return error.response.data;
  } else {
    return error.message;
  }
};

export const getLocalDate = (date, formate = 'MMMM Do YYYY, h:mm a') => {
  return moment(date).format(formate);
};

export const useQuery = () => {
  return useSearchParams();
};

export const getAllQueryParams = (query) => {
  const data = {};
  for (const [key, value] of query) {
    data[key] = value;
  }
  return data;
};

export const getParams = (query, data) => {
  for (const key of Object.keys(data)) {
    let value = query.get(key);
    if (value?.includes(',')) {
      value = value.split(',');
    } else if (key === 'multipleStatus') {
      value = [];
    }

    if (
      key === 'dateFrom' ||
      key === 'dateTo' ||
      key === 'receiveDateFrom' ||
      key === 'receiveDateTo'
    ) {
      value = value?.replace(' ', '+');
    }

    data = { ...data, [key]: value || null };
  }
  return data;
};

export const getQueryParams = (query, filterItems) => {
  let _data = {};
  for (const i in filterItems) {
    const element = filterItems[i];
    _data[element.name] = element.value ?? '';
  }
  _data = getParams(query, _data);
  return _data;
};

export const getBase64Image = (data) => {
  const base64 = btoa(
    // eslint-disable-next-line no-undef
    new Uint8Array(data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  );

  return 'data:;base64,' + base64;
};

export const bindUrlWithParams = (url, params) => {
  let result = url;

  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  Object.keys(params).forEach((key, index) => {
    if (index === 0) {
      result += `?${key}=${params[key]}`;
    } else {
      result += `&${key}=${params[key]}`;
    }
  });

  return result;
};

export const getFullPreviousRoute = (history) => {
  return `${history.location.pathname}${history.location.search}`;
};

export const resetState = (data) => {
  for (const key of Object.keys(data)) {
    data = { ...data, [key]: '' };
  }
  return data;
};

export const getAllNonObjectValues = (data) => {
  const singleValue = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== 'object') {
      singleValue[key] = value;
    }
  }
  return singleValue;
};

export const hasPermission = (loggedInUserPermissions, permissions) => {
  if (!permissions) {
    return false;
  }

  if (permissions.includes(Permission.ALL)) {
    return true;
  }

  if (!loggedInUserPermissions) {
    return false;
  }

  for (const permission of permissions) {
    if (loggedInUserPermissions.includes(permission)) {
      return true;
    }
  }

  return false;
};

// const cache = createIntlCache();

// // Create the `intl` object
// const intl = createIntl(
//   {
//     // Locale of the application
//     locale: 'en',
//     // Locale of the fallback defaultMessage
//     defaultLocale: 'en',
//   },
//   cache,
// );

// export function formatCurrency(amount) {
//   return intl
//     .formatNumber(amount, { style: 'currency', currency: 'BDT' })
//     .replace('BDT', CURRENCY);
// }

export const isEmptyObject = (obj) => {
  if (obj === undefined || obj === null) return true;
  return Object.keys(obj).length === 0;
};

export function getBestRatedCourses(coursesByCategory, limit = 6) {
  const allCourses = Object.values(coursesByCategory).flat();
  const sortedCourses = allCourses.sort((a, b) => b.avgRating - a.avgRating);
  return sortedCourses.slice(0, limit);
}

export const getStringAndObjectValue = (value, key) => {
  if (value === undefined || value === null) {
    return 'N/A';
  }
  return typeof value === 'string'
    ? value
    : value[key]
      ? value[key]
      : 'Not Found key';
};

export const getValue = (value, key) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return 'N/A';
  }

  if (Array.isArray(value)) {
    return (
      value
        .map((item) => {
          if (typeof item === 'object' && item !== null) {
            return key && item[key] ? item[key] : 'N/A';
          }
          return typeof item === 'string' ? item : 'N/A';
        })
        .filter((item) => item !== 'N/A')
        .join(', ') || 'N/A'
    );
  }

  return typeof value === 'string' && value.trim() ? value : 'N/A';
};
