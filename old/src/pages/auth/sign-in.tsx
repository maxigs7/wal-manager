import { Link as ReactLink } from 'react-router-dom';

import { Heading, Icon, Flex, Link } from '@chakra-ui/react';

import { SignInByEmail } from '@m/auth';
import { AUTH_SIGN_UP_ENABLED, WalletLogo } from '@shared';

const SignInPage: React.FC = () => (
  <Flex align="center" color="white" direction="column" mb={5}>
    <Icon as={WalletLogo} h={24} w={24} />

    <Heading as="h2" mb={16} mt={8} size="3xl">
      Wal Manager
    </Heading>

    <Heading as="h3" mb={16} size="2xl">
      Inicia sesion en tu cuenta
    </Heading>

    <SignInByEmail />

    {AUTH_SIGN_UP_ENABLED && (
      <Link as={ReactLink} colorScheme="cello" mt={5} to="/auth/sign-up">
        No tienes una cuenta? Crea una aqui
      </Link>
    )}
  </Flex>
);

export default SignInPage;
