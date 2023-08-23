import 'server-only';

import NextLink from 'next/link';

import { Metadata } from 'next';

import Link from '@mui/material/Link';

import { getScopedI18n } from '@/i18n/server';
import ResetPasswordRequestButtonSubmit from '@/m/auth/reset-password/request/button';
import { ResetPasswordRequestForm } from '@/m/auth/reset-password/request/form';
import ResetPasswordRequestFormManager from '@/m/auth/reset-password/request/manager';
import PageDescription from '@/m/layout/auth/page-description';
import PageTitle from '@/m/layout/auth/page-title';
import { routes } from '@/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('auth.resetPassword');

  return {
    title: `${t('requestTitle')} - WAL`,
  };
}

const Page = async () => {
  const t = await getScopedI18n('auth.resetPassword');
  return (
    <>
      <PageTitle>{t('requestTitle')}</PageTitle>
      <PageDescription>{t('requestDescription')}</PageDescription>

      <ResetPasswordRequestFormManager
        translations={{
          requestError: t('requestError'),
          requestSuccess: t('requestSuccess'),
        }}
      >
        <ResetPasswordRequestForm
          translations={{
            email: t('form.email'),
          }}
        />

        <ResetPasswordRequestButtonSubmit>{t('requestAction')}</ResetPasswordRequestButtonSubmit>
      </ResetPasswordRequestFormManager>

      <Link component={NextLink} href={routes.auth.signIn} ml={1} prefetch={false} variant="body2">
        {t('signInLink')}
      </Link>
    </>
  );
};

export default Page;
