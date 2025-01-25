import { NextResponse } from 'next/server';
import { ACCESS_TOKEN, protectedRoutes } from './helpers/constant';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Check for token in cookies (synced from localStorage)
    const token = request.cookies.get(ACCESS_TOKEN);

    // if (!token) {
    //   const loginUrl = new URL('/login', request.url);
    //   loginUrl.searchParams.set('redirectTo', pathname);
    //   return NextResponse.redirect(loginUrl);
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [],
};
