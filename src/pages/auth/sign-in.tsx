import { Heading, Icon, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import { es } from '@i18n';
import { getDefaultLayout, NextPageWithLayout } from '@layout';
import { SignInByEmail } from '@m/auth';
import { AUTH_SIGN_UP_ENABLED, WalletLogo } from '@shared';

const SignInPage: NextPageWithLayout = () => (
  <Flex align="center" color="white" direction="column" mb={5}>
    <Icon as={WalletLogo} h={24} w={24} />

    <Heading as="h2" mb={16} mt={8} size="3xl">
      {es.common.appName}
    </Heading>

    <Heading as="h3" mb={16} size="2xl">
      {es.auth.signIn.title}
    </Heading>

    <SignInByEmail />

    {AUTH_SIGN_UP_ENABLED && (
      <Link as={NextLink} colorScheme="cello" mt={5} href="/auth/sign-up">
        {es.auth.signIn.registrationLink}
      </Link>
    )}
  </Flex>
);

SignInPage.getLayout = getDefaultLayout;

export default SignInPage;
