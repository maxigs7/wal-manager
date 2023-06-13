'use client';

import Link from 'next/link';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';

import { PlusIcon } from '@/lib/heroicons';

type Props = ButtonProps & { href: string };

const CreateButtonLink: React.FC<Props> = ({
  children,
  colorScheme = 'accent',
  href,
  size = 'sm',
  textTransform = 'uppercase',
  ...buttonProps
}) => {
  return (
    <Button
      as={Link}
      colorScheme={colorScheme}
      href={href}
      leftIcon={<Icon as={PlusIcon} />}
      prefetch={false}
      size={size}
      textTransform={textTransform}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export { CreateButtonLink };
