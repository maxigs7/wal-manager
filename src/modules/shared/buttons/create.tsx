import Link from 'next/link';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';

import { PlusIcon } from '@/assets';

type Props = ButtonProps & { href: string };

const CreateButtonLink: React.FC<Props> = ({
  children,
  colorScheme = 'accent',
  href,
  size = 'sm',
  ...buttonProps
}) => {
  return (
    <Button
      as={Link}
      colorScheme={colorScheme}
      href={href}
      leftIcon={<Icon as={PlusIcon} boxSize="3" />}
      prefetch={false}
      rounded="2xl"
      size={size}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export { CreateButtonLink };
