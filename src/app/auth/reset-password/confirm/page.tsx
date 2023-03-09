import Link from 'next/link';

import { es } from '@/i18n';
import { AuthPageTitle, AuthPageWrapper } from '@/layout/auth/components';
import { ResetPasswordConfirm } from '@/m/auth/containers';
import { routes } from '@/routes';

export default function Page() {
  return (
    <AuthPageWrapper>
      <AuthPageTitle>{es.auth.resetPassword.title}</AuthPageTitle>

      <ResetPasswordConfirm />

      <Link className="mt-8 text-sm font-bold text-black underline" href={routes.auth.signIn}>
        {es.auth.resetPassword.signInLink}
      </Link>
    </AuthPageWrapper>
  );
}
