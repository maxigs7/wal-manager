import Link from 'next/link';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';

import { PlusIcon } from '@/m/shared/icons';

type Props = ButtonProps & { href?: string };

const CreateButton: React.FC<Props> = ({
  children,
  colorScheme = 'accent',
  href,
  size = 'sm',
  ...buttonProps
}) => {
  const linkProps = href ? { as: Link, href, prefetch: false } : {};
  return (
    <Button
      {...linkProps}
      colorScheme={colorScheme}
      leftIcon={<Icon as={PlusIcon} boxSize="3" />}
      rounded="2xl"
      size={size}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export { CreateButton };
