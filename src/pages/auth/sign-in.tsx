import { Link as ReactLink } from 'react-router-dom';

import { Heading, Icon, Flex, Link } from '@chakra-ui/react';

import { ReactComponent as WalletLogo } from '@assets/images/wallet.svg';
import { AUTH_SIGN_UP_ENABLED } from '@constants';
import { SignInContainer } from '@containers';

const SignInPage: React.FC = () => (
  <Flex align="center" color="white" direction="column" mb={5}>
    <Icon as={WalletLogo} h={24} w={24} />

    <Heading as="h2" mb={16} mt={8} size="3xl">
      Wal Manager
    </Heading>

    <Heading as="h3" mb={16} size="2xl">
      Inicia sesion en tu cuenta
    </Heading>

    <SignInContainer />

    {AUTH_SIGN_UP_ENABLED && (
      <Link as={ReactLink} colorScheme="cello" mt={5} to="/auth/sign-up">
        No tienes una cuenta? Crea una aqui
      </Link>
    )}
  </Flex>
);

export default SignInPage;
