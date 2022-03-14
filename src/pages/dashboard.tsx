import React from 'react';

import { Button, HStack, useColorMode } from '@chakra-ui/react';

import { Page } from '@shared';

const DashboardPage: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Page metaTitle="Dashboard" title="Dashboard">
      <HStack>
        <Button colorScheme="accent" onClick={toggleColorMode} variant="ghost">
          TEST
        </Button>
        <Button colorScheme="accent" onClick={toggleColorMode} variant="outline">
          TEST
        </Button>
        <Button colorScheme="accent" onClick={toggleColorMode} variant="solid">
          TEST
        </Button>
        <Button colorScheme="accent" onClick={toggleColorMode} variant="link">
          TEST
        </Button>
      </HStack>
    </Page>
  );
};

export default DashboardPage;
