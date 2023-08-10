import 'server-only';

import { Metadata } from 'next';

import { getScopedI18n } from '@/i18n/server';
import { PageTitle } from '@/layout/auth';
import { AuthLink } from '@/m/auth/components/link';
import {
  ResetPasswordRequestManager,
  ResetPasswordRequestForm,
} from '@/m/auth/reset-password/request';
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
      <ResetPasswordRequestManager
        translations={{
          requestError: t('requestError'),
          requestAction: t('requestAction'),
          requestSuccess: t('requestSuccess'),
        }}
      >
        <ResetPasswordRequestForm
          translations={{
            email: t('form.email'),
            emailPlaceholder: t('form.emailPlaceholder'),
          }}
        />
      </ResetPasswordRequestManager>

      <AuthLink className="mx-auto my-8" href={routes.auth.signIn}>
        {t('signInLink')}
      </AuthLink>
    </>
  );
};

export default Page;
