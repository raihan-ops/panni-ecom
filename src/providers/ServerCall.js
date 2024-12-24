import { ACCESS_TOKEN } from '@/helpers/constant';
import { cookies } from 'next/headers';
export const dataFetcher = async ({ url, options = {}, requireAuth = true }) => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(ACCESS_TOKEN)?.value;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(requireAuth && authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { success: false, error: error.message };
  }
};
