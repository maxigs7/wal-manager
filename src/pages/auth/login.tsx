import { Heading, Icon, Flex } from '@chakra-ui/react';

import { ReactComponent as WalletLogo } from '@app/assets/images/wallet.svg';
import { LoginContainer } from '@app/containers';

const LoginPage: React.FC = () => (
  <Flex align="center" color="white" direction="column">
    <Icon as={WalletLogo} h={24} w={24} />

    <Heading as="h2" mb={16} mt={8} size="3xl">
      Wal Manager
    </Heading>

    <Heading as="h3" mb={16} size="2xl">
      Login To Your Account
    </Heading>

    <LoginContainer />
  </Flex>
);

export default LoginPage;
