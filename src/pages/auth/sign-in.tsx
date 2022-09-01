import { Heading, Flex, Link, Box } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { es } from '@i18n';
import { getAuthLayout, NextPageWithLayout } from '@layout';
import { SignInByEmail } from '@m/auth';
import { AUTH_SIGN_UP_ENABLED } from '@shared';

const SignInPage: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{es.auth.signIn.title} - WAL</title>
    </Head>
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

      {AUTH_SIGN_UP_ENABLED && (
        <Box mt="3">
          <Link as={NextLink} href="/auth/sign-up">
            {es.auth.signIn.registrationLink}
          </Link>
        </Box>
      )}
    </Flex>
  </>
);

SignInPage.getLayout = getAuthLayout;

export default SignInPage;
