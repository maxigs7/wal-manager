import 'server-only';

import { Metadata } from 'next';

import { getScopedI18n } from '@/i18n/server';
import { PageTitle } from '@/layout/auth';
import { AuthLink } from '@/m/auth/components/link';
import { SignUpFormManager, SignUpForm } from '@/m/auth/sign-up';
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

      <SignUpFormManager
        translations={{
          error: t('error'),
          action: t('action'),
        }}
      >
        <SignUpForm
          translations={{
            email: t('form.email'),
            emailPlaceholder: t('form.emailPlaceholder'),
            password: t('form.password'),
            passwordPlaceholder: t('form.passwordPlaceholder'),
            confirmPassword: t('form.confirmPassword'),
            confirmPasswordPlaceholder: t('form.confirmPasswordPlaceholder'),
          }}
        />
      </SignUpFormManager>

      <p className="gray.500 text-tiny mx-auto my-8">
        {t('signInLink.haveAnAccount')}
        <AuthLink className="ml-1" href={routes.auth.signIn}>
          {t('signInLink.link')}
        </AuthLink>
      </p>
    </>
  );
};

export default Page;
