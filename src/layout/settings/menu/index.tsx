'use client';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { menuData } from './data';
import { MenuLink } from './menu-link';

export const Menu: React.FC = () => {
  const bg = useColorModeValue('white', 'primary.800');
  return (
    <Flex
      align={{ base: 'center', lg: 'flex-start' }}
      basis={{ lg: '300px' }}
      bg={bg}
      direction={{ lg: 'column' }}
      m={{ lg: '2' }}
      overflowX={{ base: 'auto', lg: 'hidden' }}
      overflowY={{ base: 'hidden' }}
      rounded={{ base: 'none', lg: 'md' }}
      shadow="md"
    >
      {menuData.map((data, index) => (
        <MenuLink key={index} href={data.href}>
          {data.label}
        </MenuLink>
      ))}
    </Flex>
  );
};
