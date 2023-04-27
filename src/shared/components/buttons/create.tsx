'use client';

import Link, { LinkProps } from 'next/link';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/outline';

type Props = ButtonProps & LinkProps;

const CreateButtonLink: React.FC<Props> = ({
  children,
  colorScheme = 'accent',
  href,
  size = 'sm',
  textTransform = 'uppercase',
  ...buttonProps
}) => (
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

export { CreateButtonLink };
