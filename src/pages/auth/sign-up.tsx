import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Heading, Flex, Link, Box } from '@chakra-ui/react';


import { es } from '@/i18n';
import { getAuthLayout, NextPageWithLayout } from '@/layout';
import { SignUpByEmail } from '@/m/auth';
import { AUTH_SIGN_UP_ENABLED } from '@/shared';

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();
  if (!AUTH_SIGN_UP_ENABLED) {
    router.replace('/auth/sign-in');
    return null;
  }

  return (
    <Flex
      align="center"
      color="primary.700"
      direction="column"
      justify="center"
      maxW={[null, null, null, 'md', 'xl']}
      mb={5}
      minW={[null, null, null, 'md', 'xl']}
      p="5"
    >
      <Heading as="h3" mb={['4', '8', '10']} size="xl" textAlign="center" textTransform="uppercase">
        {es.auth.signUp.title}
      </Heading>

      <SignUpByEmail />

      <Box mt="3">
        <Link as={NextLink} href="/auth/sign-up">
          {es.auth.signUp.signInLink}
        </Link>
      </Box>
    </Flex>
  );
};
SignUpPage.getLayout = getAuthLayout;

export default SignUpPage;
