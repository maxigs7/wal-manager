import 'server-only';

import { Text } from '@chakra-ui/react';

import { es } from '@/i18n';
import { PageTitle } from '@/layout/auth';
import { AuthLink } from '@/m/auth/components';
import { SignInFormContainer, SignInForm } from '@/m/auth/sign-in';
import { routes } from '@/routes';
import { AUTH_SIGN_UP_ENABLED } from '@/shared/config';

export const metadata = {
  title: `${es.auth.signIn.title} - WAL`,
};

const Page = () => {
  return (
    <>
      <PageTitle>{es.auth.signIn.title}</PageTitle>
      <SignInFormContainer>
        <SignInForm />
      </SignInFormContainer>

      {AUTH_SIGN_UP_ENABLED && (
        <Text color="gray.500" fontSize="sm" mx="auto" my="8">
          {es.auth.signIn.registrationLink.dontHaveAccount}
          <AuthLink href={routes.auth.signUp} ml="1">
            {es.auth.signIn.registrationLink.link}
          </AuthLink>
        </Text>
      )}
    </>
  );
};

export default Page;
