import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for the 'admin' cookie
  const isAdminCookie = request.cookies.get('admin');

  // If trying to access /admin without the cookie
  if (pathname.startsWith('/admin') && (!isAdminCookie || isAdminCookie.value !== '1')) {
    // Redirect to the login page, preserving the intended destination
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
};
