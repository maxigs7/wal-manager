import 'server-only';

import { es } from '@/i18n';
import { PageTitle } from '@/layout/auth';
import { AuthLink } from '@/m/auth/components';
import { ResetPasswordRequestContainer, ResetPasswordRequestForm } from '@/m/auth/reset-password';
import { routes } from '@/routes';

export const metadata = {
  title: `${es.auth.resetPassword.title} - WAL`,
};

export default function Page() {
  return (
    <>
      <PageTitle>{es.auth.resetPassword.title}</PageTitle>
      <ResetPasswordRequestContainer>
        <ResetPasswordRequestForm />
      </ResetPasswordRequestContainer>

      <AuthLink color="gray.500" fontSize="sm" href={routes.auth.signIn} mx="auto" my="8">
        {es.auth.resetPassword.signInLink}
      </AuthLink>
    </>
  );
}
