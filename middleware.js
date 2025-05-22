import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Skip middleware for static files and API routes
  if (request.nextUrl.pathname.startsWith('/_next') || 
      request.nextUrl.pathname.startsWith('/api') ||
      request.nextUrl.pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  // Block access to the attachments page during build
  if (request.nextUrl.pathname.startsWith('/attachments')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// This tells Next.js to not try to statically generate the attachments page
export const dynamic = 'force-dynamic';
