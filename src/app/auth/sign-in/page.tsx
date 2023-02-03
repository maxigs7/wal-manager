import NextLink from 'next/link';

import { Heading, Flex, Link, VStack } from '@chakra-ui/react';

import { es } from '@/i18n';
import { SignInByEmail } from '@/m/auth';
import { routes } from '@/routes';
import { AUTH_SIGN_UP_ENABLED } from '@/shared';

export default function SignInPage() {
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
        {es.auth.signIn.title}
      </Heading>

      <SignInByEmail />

      <VStack mt="3">
        {AUTH_SIGN_UP_ENABLED && (
          <Link as={NextLink} href={routes.auth.signUp}>
            {es.auth.signIn.registrationLink}
          </Link>
        )}
        <Link as={NextLink} href={routes.auth.resetPassword}>
          {es.auth.signIn.resetPasswordLink}
        </Link>
      </VStack>
    </Flex>
  );
}
