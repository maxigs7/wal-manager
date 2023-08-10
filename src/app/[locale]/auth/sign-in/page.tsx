import 'server-only';

import { Metadata } from 'next';

import { getScopedI18n } from '@/i18n/server';
import { PageTitle } from '@/layout/auth';
import { AuthLink } from '@/m/auth/components/link';
import { SignInForm } from '@/m/auth/sign-in/form';
import { SignInFormManager } from '@/m/auth/sign-in/manager';
import { AUTH_SIGN_UP_ENABLED } from '@/m/shared/config';
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
      <SignInFormManager
        translations={{
          error: t('error'),
          action: t('action'),
          resetPasswordLink: t('resetPasswordLink'),
        }}
      >
        <SignInForm
          translations={{
            email: t('form.email'),
            emailPlaceholder: t('form.emailPlaceholder'),
            password: t('form.password'),
            passwordPlaceholder: t('form.passwordPlaceholder'),
          }}
        />
      </SignInFormManager>

      {AUTH_SIGN_UP_ENABLED && (
        <p className="gray.500 text-tiny mx-auto my-8">
          {t('registrationLink.dontHaveAccount')}
          <AuthLink className="ml-1" href={routes.auth.signUp}>
            {t('registrationLink.link')}
          </AuthLink>
        </p>
      )}
    </>
  );
};

export default Page;
