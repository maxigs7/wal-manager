import React from 'react';

import { Flex } from '@chakra-ui/react';

import { ColorModeToggle } from '@/shared';

import { Breadcrumb } from '../breadcrumb';
import { Hamburger } from './hamburger';
import { NavbarWrapper } from './wrapper';

export const Navbar: React.FC = () => {
  return (
    <NavbarWrapper>
      {/* Header: Left side */}
      <Flex align="center" h="full">
        {/* Hamburger button */}
        <Hamburger />
      </Flex>
      <Breadcrumb />
      {/* Header: Right side */}
      <Flex align="center" h="full" ml="auto">
        <ColorModeToggle />
      </Flex>
    </NavbarWrapper>
  );
};
