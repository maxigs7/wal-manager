import 'server-only';

import NextLink from 'next/link';

import { Metadata } from 'next';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { getScopedI18n } from '@/i18n/server';
import SignUpButtonSubmit from '@/m/auth/sign-up/button';
import SignUpForm from '@/m/auth/sign-up/form';
import SignUpFormManager from '@/m/auth/sign-up/manager';
import PageDescription from '@/m/layout/auth/page-description';
import PageTitle from '@/m/layout/auth/page-title';
import { routes } from '@/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('auth.signUp');

  return {
    title: `${t('title')} - WAL`,
  };
}

const Page = async () => {
  const t = await getScopedI18n('auth.signUp');

  return (
    <>
      <PageTitle>{t('title')}</PageTitle>
      <PageDescription>{t('description')}</PageDescription>

      <SignUpFormManager translations={{ error: t('error') }}>
        <SignUpForm
          translations={{
            email: t('form.email'),
            password: t('form.password'),
            confirmPassword: t('form.confirmPassword'),
          }}
        />

        <SignUpButtonSubmit>{t('action')}</SignUpButtonSubmit>
      </SignUpFormManager>

      <Typography color="text.secondary" variant="body2">
        {t('signInLink.haveAnAccount')}

        <Link component={NextLink} href={routes.auth.signIn} ml={1} prefetch={false}>
          {t('signInLink.link')}
        </Link>
      </Typography>
    </>
  );
};

export default Page;
