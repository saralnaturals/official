import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /login, /admin)
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/admin'];
  const authRoutes = ['/login', '/forgot-password'];

  // Get session token from cookies
  const sessionCookie = request.cookies.get('session')?.value;
  let session = null;

  if (sessionCookie) {
    session = await decrypt(sessionCookie);
  }

  // Redirect to login if accessing protected routes without session
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check admin access for admin routes
    if (pathname.startsWith('/admin') && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Redirect to investments if already logged in and accessing auth routes
  if (authRoutes.some(route => pathname.startsWith(route)) && session) {
    return NextResponse.redirect(new URL('/investments', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};