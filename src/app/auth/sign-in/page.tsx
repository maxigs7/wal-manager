import 'server-only';

import { Metadata } from 'next';

import { Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import { PageTitle } from '@/layout/auth';
import { AuthLink } from '@/m/auth/components';
import { SignInFormContainer, SignInForm } from '@/m/auth/sign-in';
import { AUTH_SIGN_UP_ENABLED } from '@/m/shared/config';
import { routes } from '@/routes';

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('auth-sign-in');

  return {
    title: `${t('title')} - WAL`,
  };
}

const Page = () => {
  const { t } = useTranslation('auth-sign-in');

  return (
    <>
      <PageTitle>{t('title')}</PageTitle>
      <SignInFormContainer>
        <SignInForm />
      </SignInFormContainer>

      {AUTH_SIGN_UP_ENABLED && (
        <Text color="gray.500" fontSize="sm" mx="auto" my="8">
          {t('registrationLink.dontHaveAccount')}
          <AuthLink href={routes.auth.signUp} ml="1">
            {t('registrationLink.link')}
          </AuthLink>
        </Text>
      )}
    </>
  );
};

export default Page;
