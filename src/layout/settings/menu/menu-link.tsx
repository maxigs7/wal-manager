'use client';

import { usePathname } from 'next/navigation';

import { Link, LinkProps } from '@/lib/chakra-ui';

const styles = {
  active: (isActive: boolean) =>
    isActive
      ? {
          bg: 'accent.500',
          color: 'white',
        }
      : {},
};

export const MenuLink: React.FC<LinkProps> = ({ children, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href.toString() || false;

  return (
    <Link
      _focus={{ outline: 'none' }}
      borderBottomColor="gray.100"
      borderBottomWidth={{ base: '0', lg: '1px' }}
      borderRightColor="gray.100"
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
        ...styles.active(true),
      }}
      {...styles.active(isActive)}
    >
      {children}
    </Link>
  );
};
