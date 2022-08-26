import { Link as ReactLink } from 'react-router-dom';

import { Heading, Icon, Flex, Link } from '@chakra-ui/react';

import { SignUpByEmail } from '@m/auth';
import { WalletLogo } from '@shared';

const SignUpPage: React.FC = () => (
  <Flex align="center" color="white" direction="column" mb={5}>
    <Icon as={WalletLogo} h={24} w={24} />

    <Heading as="h2" mb={16} mt={8} size="3xl">
      Wal Manager
    </Heading>

    <Heading as="h3" mb={16} size="2xl">
      Registre una nueva cuenta
    </Heading>

    <SignUpByEmail />

    <Link as={ReactLink} colorScheme="cello" mt={5} to="/auth/sign-in">
      Ya tienes una cuenta? Inicia sesion
    </Link>
  </Flex>
);

export default SignUpPage;
