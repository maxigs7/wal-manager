import { Heading, Flex, Link, Box } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { es } from '@i18n';
import { getAuthLayout, NextPageWithLayout } from '@layout';
import { ResetPasswordConfirm } from '@m/auth';

const SignInPage: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{es.auth.resetPassword.title} - WAL</title>
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
        {es.auth.resetPassword.title}
      </Heading>

      <ResetPasswordConfirm />

      <Box mt="3">
        <Link as={NextLink} href="/auth/sign-in">
          {es.auth.resetPassword.signInLink}
        </Link>
      </Box>
    </Flex>
  </>
);

SignInPage.getLayout = getAuthLayout;

export default SignInPage;
