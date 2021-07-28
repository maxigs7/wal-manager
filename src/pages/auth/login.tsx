import { Heading, Icon, Flex } from '@chakra-ui/react';

import { ReactComponent as WalletLogo } from '@app/assets/images/wallet.svg';
import { LoginContainer } from '@app/modules/auth';

// const styles = {
//   container:
//     'w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-white py-12 px-2 sm:px-0 flex flex-col text-center',
//   logo: 'w-24 h-24 text-white',
//   title: 'mt-16 mx-2 text-2xl sm:text-3xl xl:text-2xl font-bold leading-tight text-white',
//   top: 'flex flex-col items-center justify-center',
// };

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
