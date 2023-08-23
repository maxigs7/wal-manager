import 'server-only';

import NextLink from 'next/link';

import { Metadata } from 'next';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { getScopedI18n } from '@/i18n/server';
import SignInButtonSubmit from '@/m/auth/sign-in/button';
import SignInForm from '@/m/auth/sign-in/form';
import SignInFormManager from '@/m/auth/sign-in/manager';
import PageDescription from '@/m/layout/auth/page-description';
import PageTitle from '@/m/layout/auth/page-title';
import { routes } from '@/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('auth.signIn');

  return {
    title: `${t('title')} - WAL`,
  };
}

const Page = async () => {
  const t = await getScopedI18n('auth.signIn');

  return (
    <>
      <PageTitle>{t('title')}</PageTitle>
      <PageDescription>{t('description')}</PageDescription>

      <SignInFormManager translations={{ error: t('error') }}>
        <SignInForm translations={{ email: t('form.email'), password: t('form.password') }} />
        <Link component={NextLink} href={routes.auth.resetPassword} variant="body2">
          {t('resetPasswordLink')}
        </Link>
        <SignInButtonSubmit>{t('action')}</SignInButtonSubmit>
      </SignInFormManager>

      <Typography color="text.secondary" variant="body2">
        {t('registrationLink.dontHaveAccount')}

        <Link component={NextLink} href={routes.auth.signUp} ml={1}>
          {t('registrationLink.link')}
        </Link>
      </Typography>
    </>
  );
};

export default Page;
