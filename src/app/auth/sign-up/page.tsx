import 'server-only';

import Link from 'next/link';

import { es } from '@/i18n';
import { AuthPageTitle, AuthPageWrapper } from '@/layout/auth/components';
import { SignUpByEmail } from '@/m/auth/containers';
import { routes } from '@/routes';
import { AUTH_SIGN_UP_ENABLED } from '@/shared/config';

export default function Page() {
  return (
    <AuthPageWrapper>
      <AuthPageTitle>{es.auth.signUp.title}</AuthPageTitle>

      <SignUpByEmail />

      {AUTH_SIGN_UP_ENABLED && (
        <p className="mt-8 text-sm text-gray-500">
          {es.auth.signUp.signInLink.haveAnAccount}
          <Link className="ml-1 font-bold text-black underline" href={routes.auth.signIn}>
            {es.auth.signUp.signInLink.link}
          </Link>
        </p>
      )}
    </AuthPageWrapper>
  );
}
