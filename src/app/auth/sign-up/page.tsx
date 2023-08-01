import 'server-only';

import { Metadata } from 'next';

import { Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import { PageTitle } from '@/layout/auth';
import { AuthLink } from '@/m/auth/components';
import { SignUpFormContainer, SignUpForm } from '@/m/auth/sign-up';
import { routes } from '@/routes';

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('auth-sign-up');

  return {
    title: `${t('title')} - WAL`,
  };
}

const Page = () => {
  const { t } = useTranslation('auth-sign-up');
  return (
    <>
      <PageTitle>{t('title')}</PageTitle>

      <SignUpFormContainer>
        <SignUpForm />
      </SignUpFormContainer>

      <Text color="gray.500" fontSize="sm" mx="auto" my="8">
        {t('signInLink.haveAnAccount')}
        <AuthLink href={routes.auth.signIn} ml="1">
          {t('signInLink.link')}
        </AuthLink>
      </Text>
    </>
  );
};

export default Page;
