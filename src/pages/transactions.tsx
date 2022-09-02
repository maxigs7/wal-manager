import { Button, HStack, useColorMode } from '@chakra-ui/react';

import { getFullLayout, NextPageWithLayout } from '@layout';

const TransactionsPage: NextPageWithLayout = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <HStack p="10">
      <p>Hola</p>
      <p>Hola</p>
      <p>Hola</p>
      <p>Hola</p>
      <p>Hola</p>
      <p>Hola</p>
      <p>Hola</p>
    </HStack>
  );
};

TransactionsPage.getLayout = getFullLayout;

export default TransactionsPage;
