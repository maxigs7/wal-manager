import 'server-only';

import { Text } from '@chakra-ui/react';

import { es } from '@/i18n';
import { PageTitle } from '@/layout/auth';
import { SignUpByEmail } from '@/m/auth/containers';
import { AuthLink } from '@/modules/auth/components';
import { routes } from '@/routes';

export const metadata = {
  title: `${es.auth.signUp.title} - WAL`,
};

const Page = () => {
  return (
    <>
      <PageTitle>{es.auth.signUp.title}</PageTitle>
      <SignUpByEmail />

      <Text color="gray.500" fontSize="sm" mx="auto" my="8">
        {es.auth.signUp.signInLink.haveAnAccount}
        <AuthLink href={routes.auth.signIn} ml="1">
          {es.auth.signUp.signInLink.link}
        </AuthLink>
      </Text>
    </>
  );
};

export default Page;
