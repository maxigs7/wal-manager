import 'server-only';

import NextLink from 'next/link';

import { Metadata } from 'next';

import Link from '@mui/material/Link';

import { getScopedI18n } from '@/i18n/server';
import ResetPasswordConfirmButtonSubmit from '@/m/auth/reset-password/confirm/button';
import { ResetPasswordConfirmForm } from '@/m/auth/reset-password/confirm/form';
import ResetPasswordConfirmFormManager from '@/m/auth/reset-password/confirm/manager';
import PageDescription from '@/m/layout/auth/page-description';
import PageTitle from '@/m/layout/auth/page-title';
import { routes } from '@/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('auth.resetPassword');

  return {
    title: `${t('confirmTitle')} - WAL`,
  };
}

const Page = async () => {
  const t = await getScopedI18n('auth.resetPassword');
  return (
    <>
      <PageTitle>{t('confirmTitle')}</PageTitle>
      <PageDescription>{t('confirmDescription')}</PageDescription>

      <ResetPasswordConfirmFormManager
        translations={{
          confirmError: t('confirmError'),
          confirmSuccess: t('confirmSuccess'),
        }}
      >
        <ResetPasswordConfirmForm
          translations={{
            password: t('form.password'),
            confirmPassword: t('form.confirmPassword'),
          }}
        />

        <ResetPasswordConfirmButtonSubmit>{t('confirmAction')}</ResetPasswordConfirmButtonSubmit>
      </ResetPasswordConfirmFormManager>

      <Link component={NextLink} href={routes.auth.signIn} ml={1} prefetch={false} variant="body2">
        {t('signInLink')}
      </Link>
    </>
  );
};

export default Page;
