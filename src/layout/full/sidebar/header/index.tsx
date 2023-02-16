import NextLink from 'next/link';
import React from 'react';

import { Flex, Link } from '@chakra-ui/react';

import { es } from '@/i18n';
import { routes } from '@/routes';
import { Logo } from '@/shared';

import { CloseButton } from './close-button';

const Header: React.FC = () => (
  <Flex align="center" justify="space-between" px="2" py="4" w="full">
    <Link
      alignItems="center"
      as={NextLink}
      display="flex"
      gap="3"
      href={routes.dashboard}
      textTransform="uppercase"
    >
      <Logo /> {es.common.appName}
    </Link>

    <CloseButton />
  </Flex>
);

export { Header };
