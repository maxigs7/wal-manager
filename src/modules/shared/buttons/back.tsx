'use client';

import { useRouter } from 'next/navigation';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';

import { ArrowLeftIcon } from '@/assets';

type Props = ButtonProps & { href: string };

const BackButtonLink: React.FC<Props> = ({
  children,
  colorScheme = 'accent',
  href,
  rounded = '2xl',
  shadow = 'md',
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
      leftIcon={<Icon as={ArrowLeftIcon} boxSize="3" />}
      onClick={() => router.push(href)}
      rounded={rounded}
      shadow={shadow}
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
