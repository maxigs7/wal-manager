import Link from 'next/link';

import { Button, Flex, Heading, Text } from '@chakra-ui/react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout } from '@layout';
import { routes } from '@routes';
import { Icon } from '@shared';

const NoAccountPage: NextPageWithLayout = () => {
  return (
    <Flex align="center" direction="column" gap="4" justify="center" minH="full" w="full">
      <Heading>{es.account.pages.noAccount.title}</Heading>
      <Text>{es.account.pages.noAccount.message}</Text>
      <Button
        as={Link}
        colorScheme="primary"
        href={routes.admin.account.create}
        leftIcon={<Icon icon="bank" />}
        size="lg"
      >
        {es.account.pages.create.title}
      </Button>
    </Flex>
  );
};

NoAccountPage.getLayout = getFullLayout;

export default NoAccountPage;
