import { Heading, Icon, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';


import { es } from '@i18n';
import { getDefaultLayout, NextPageWithLayout } from '@layout';
import { SignUpByEmail } from '@m/auth';
import { WalletLogo } from '@shared';

const SignUpPage: NextPageWithLayout = () => (
  <Flex align="center" color="white" direction="column" mb={5}>
    <Icon as={WalletLogo} h={24} w={24} />

    <Heading as="h2" mb={16} mt={8} size="3xl">
      {es.common.appName}
    </Heading>

    <Heading as="h3" mb={16} size="2xl">
      {es.auth.signUp.title}
    </Heading>

    <SignUpByEmail />

    <Link as={NextLink} colorScheme="cello" mt={5} href="/auth/sign-in">
      {es.auth.signUp.signInLink}
    </Link>
  </Flex>
);

SignUpPage.getLayout = getDefaultLayout;

export default SignUpPage;
