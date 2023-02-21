import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';

import { Add } from '@/lib/svg';

type Props = PropsWithChildren & ButtonProps & LinkProps;

const AddLinkButton: React.FC<Props> = ({ children, href }) => (
  <Button
    as={Link}
    colorScheme="primary"
    href={href}
    leftIcon={<Icon as={Add} boxSize="4" fill="current" />}
    size="sm"
    textTransform="uppercase"
  >
    {children}
  </Button>
);

export { AddLinkButton };
