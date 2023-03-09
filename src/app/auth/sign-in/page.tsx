import 'server-only';

import Link from 'next/link';

import { es } from '@/i18n';
import { AuthPageTitle, AuthPageWrapper } from '@/layout/auth/components';
import { SignInByEmail } from '@/m/auth/containers';
import { routes } from '@/routes';
import { AUTH_SIGN_UP_ENABLED } from '@/shared/config';

export default function Page() {
  return (
    <AuthPageWrapper>
      <AuthPageTitle>{es.auth.signIn.title}</AuthPageTitle>

      <SignInByEmail />

      {AUTH_SIGN_UP_ENABLED && (
        <p className="mt-8 text-sm text-gray-500">
          {es.auth.signIn.registrationLink.dontHaveAccount}
          <Link className="ml-1 font-bold text-black underline" href={routes.auth.signUp}>
            {es.auth.signIn.registrationLink.link}
          </Link>
        </p>
      )}
    </AuthPageWrapper>
  );
}
