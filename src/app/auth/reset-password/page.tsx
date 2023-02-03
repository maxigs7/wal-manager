import NextLink from 'next/link';

import { Heading, Flex, Link, Box } from '@chakra-ui/react';

import { es } from '@/i18n';
import { ResetPasswordRequest } from '@/m/auth';
import { routes } from '@/routes';

export default function Page() {
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
        {es.auth.resetPassword.title}
      </Heading>

      <ResetPasswordRequest />

      <Box mt="3">
        <Link as={NextLink} href={routes.auth.signIn}>
          {es.auth.resetPassword.signInLink}
        </Link>
      </Box>
    </Flex>
  );
}
