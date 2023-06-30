import React from 'react';

import { Flex, Icon } from '@chakra-ui/react';

import { Link } from '@/lib/chakra-ui';
import { LogoIcon } from '@/m/shared/icons';
import { routes } from '@/routes';

import { NAVBAR_HEIGHT } from '../../constants';
import { CloseButton } from './close-button';

const Header: React.FC = () => (
  <Flex
    align="center"
    justify={{ base: 'space-between', lg: 'center' }}
    minH={NAVBAR_HEIGHT}
    px="3"
  >
    <Link
      alignItems="center"
      display="flex"
      gap="3"
      href={routes.dashboard}
      textDecoration="none"
      textTransform="uppercase"
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Icon as={LogoIcon} boxSize="12" fill="primary.400" />
    </Link>

    <CloseButton />
  </Flex>
);

export { Header };
