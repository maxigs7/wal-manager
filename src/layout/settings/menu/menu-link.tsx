'use client';

import { usePathname } from 'next/navigation';

import { useColorModeValue } from '@chakra-ui/react';

import { Link, LinkProps } from '@/lib/chakra-ui';

const styles = {
  active: (isActive: boolean, bg: string) =>
    isActive
      ? {
          bg: bg,
          color: 'white',
        }
      : {},
};

export const MenuLink: React.FC<LinkProps> = ({ children, href }) => {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href.toString()) || false;
  const bg = useColorModeValue('accent.500', 'accent.800');
  const border = useColorModeValue('gray.100', 'primary.900');

  return (
    <Link
      _focus={{ outline: 'none' }}
      borderBottomColor={border}
      borderBottomWidth={{ base: '0', lg: '1px' }}
      borderRightColor={border}
      borderRightWidth={{ base: '1px', lg: '0' }}
      href={href}
      minW={{ base: '140px', lg: 'full' }}
      outline="none"
      p="3"
      prefetch={false}
      textAlign={{ base: 'center', lg: 'left' }}
      transition="all 0.3s"
      _hover={{
        textDecor: 'none',
        ...styles.active(true, bg),
      }}
      {...styles.active(isActive, bg)}
    >
      {children}
    </Link>
  );
};
