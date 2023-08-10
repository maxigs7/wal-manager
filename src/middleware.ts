import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createI18nMiddleware } from 'next-international/middleware';

import type { Database } from '@/models';
import { PUBLIC_ROUTES, routes } from '@/routes';

const I18nMiddleware = createI18nMiddleware(['en', 'es'] as const, 'es', {
  urlMappingStrategy: 'rewrite',
});

export async function middleware(req: NextRequest) {
  // USER CHECK
  const res = I18nMiddleware(req);
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

  if (req.nextUrl.pathname === routes.settings.index) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = routes.settings.user;
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
