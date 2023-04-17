import { es } from '@/i18n';
import { PageTitle } from '@/layout/auth';
import { ResetPasswordConfirm } from '@/m/auth/containers';
import { AuthLink } from '@/modules/auth/components';
import { routes } from '@/routes';

export const metadata = {
  title: `${es.auth.resetPassword.title} - WAL`,
};

export default function Page() {
  return (
    <>
      <PageTitle>{es.auth.resetPassword.title}</PageTitle>
      <ResetPasswordConfirm />

      <AuthLink color="gray.500" fontSize="sm" href={routes.auth.signIn} mx="auto" my="8">
        {es.auth.resetPassword.signInLink}
      </AuthLink>
    </>
  );
}
