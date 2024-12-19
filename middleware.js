import { NextResponse } from 'next/server';
import { ADMIN_PATH, LOGIN_PATH, PATH_MY_TESTS } from '@/helpers/Slugs';
import { ACCESS_TOKEN, openRoutes } from './helpers/constant';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  // Check if the pathname is in the open routes
  if (openRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  // For all other routes, check for authentication
  const token = request.cookies.get(ACCESS_TOKEN);
  if (token) {
    // User is authenticated, allow the request to proceed
    return NextResponse.next();
  } else {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};
