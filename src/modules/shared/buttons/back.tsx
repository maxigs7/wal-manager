'use client';

import { useRouter } from 'next/navigation';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';

import { ArrowLeftIcon } from '@/lib/heroicons';

type Props = ButtonProps & { href: string };

const BackButtonLink: React.FC<Props> = ({
  children,
  colorScheme = 'accent',
  href,
  size = 'sm',
  textTransform = 'uppercase',
  variant = 'outline',
  ...buttonProps
}) => {
  const router = useRouter();

  return (
    <Button
      colorScheme={colorScheme}
      href={href}
      leftIcon={<Icon as={ArrowLeftIcon} />}
      onClick={() => router.push(href)}
      size={size}
      textTransform={textTransform}
      variant={variant}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export { BackButtonLink };
