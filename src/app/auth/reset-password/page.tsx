import 'server-only';

import { Metadata } from 'next';

import useTranslation from 'next-translate/useTranslation';

import { PageTitle } from '@/layout/auth';
import { AuthLink } from '@/m/auth/components';
import { ResetPasswordRequestContainer, ResetPasswordRequestForm } from '@/m/auth/reset-password';
import { routes } from '@/routes';

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('auth-reset-password');

  return {
    title: `${t('title')} - WAL`,
  };
}

export default function Page() {
  const { t } = useTranslation('auth-reset-password');
  return (
    <>
      <PageTitle>{t('title')}</PageTitle>
      <ResetPasswordRequestContainer>
        <ResetPasswordRequestForm />
      </ResetPasswordRequestContainer>

      <AuthLink color="gray.500" fontSize="sm" href={routes.auth.signIn} mx="auto" my="8">
        {t('signInLink')}
      </AuthLink>
    </>
  );
}
