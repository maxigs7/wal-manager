import 'server-only';

import { Metadata } from 'next';

import { getScopedI18n } from '@/i18n/server';
import { PageTitle } from '@/layout/auth';
import { AuthLink } from '@/m/auth/components/link';
import {
  ResetPasswordConfirmManager,
  ResetPasswordConfirmForm,
} from '@/m/auth/reset-password/confirm';
import { routes } from '@/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('auth.resetPassword');

  return {
    title: `${t('title')} - WAL`,
  };
}

const Page = async () => {
  const t = await getScopedI18n('auth.resetPassword');

  return (
    <>
      <PageTitle>{t('title')}</PageTitle>

      <ResetPasswordConfirmManager
        translations={{
          confirmError: t('confirmError'),
          confirmAction: t('confirmAction'),
          confirmSuccess: t('confirmSuccess'),
        }}
      >
        <ResetPasswordConfirmForm
          translations={{
            password: t('form.password'),
            passwordPlaceholder: t('form.passwordPlaceholder'),
            confirmPassword: t('form.confirmPassword'),
            confirmPasswordPlaceholder: t('form.confirmPasswordPlaceholder'),
          }}
        />
      </ResetPasswordConfirmManager>

      <AuthLink className="mx-auto my-8" href={routes.auth.signIn}>
        {t('signInLink')}
      </AuthLink>
    </>
  );
};

export default Page;
