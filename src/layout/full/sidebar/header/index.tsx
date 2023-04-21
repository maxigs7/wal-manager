import React from 'react';

import { Icon } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Link } from '@/lib/chakra-ui';
import { routes } from '@/routes';
import { WalletLogo } from '@/shared/assets';

import { CloseButton } from './close-button';
import { Wrapper } from './wrapper';

const Header: React.FC = () => (
  <Wrapper>
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
      <Icon as={WalletLogo} boxSize="6" />
      {es.common.appName}
    </Link>

    <CloseButton />
  </Wrapper>
);

export { Header };
