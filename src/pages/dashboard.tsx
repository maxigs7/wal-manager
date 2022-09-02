import { Button, HStack, useColorMode } from '@chakra-ui/react';

import { getFullLayout, NextPageWithLayout } from '@layout';

const DashboardPage: NextPageWithLayout = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <HStack p="10">
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
  );
};

DashboardPage.getLayout = getFullLayout;

export default DashboardPage;
