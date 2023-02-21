import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/models';
import { PUBLIC_ROUTES, routes } from '@/routes';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  if (!session && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    // Auth condition not met, redirect to home page.
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = routes.auth.signIn;
    redirectUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (session && req.nextUrl.pathname === '/') {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = routes.dashboard;
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

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
