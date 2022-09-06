import { Flex, Heading, Icon } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

import { es } from '@i18n';
import { WalletLogo } from '@shared';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <Flex
    as="section"
    bg="primary.500"
    direction={['column', 'row']}
    minH={[null, '100vh']}
    minW={[null, '100vw']}
  >
    <Flex direction="column" p={['5', '10', '16', '16', '28']} textAlign={['center', null]}>
      <Heading
        alignItems="center"
        as="h1"
        color="white"
        display="flex"
        flexDirection={['row', 'column', 'column', 'column', 'row']}
        fontSize={['2xl', '5xl', '6xl']}
        justifyContent="center"
        mb="2"
        textTransform="uppercase"
      >
        <Icon as={WalletLogo} mr="3" />
        {es.common.appName}
      </Heading>
      <Heading as="h2" color="primary.300" fontSize={['xl', 'xl', '2xl']} ml={[null, null, '10']}>
        {es.common.description}
      </Heading>
    </Flex>
    <Flex bg="white" color="primary.500" ml={[null, 'auto']}>
      {children}
    </Flex>
  </Flex>
);

export default AuthLayout;
