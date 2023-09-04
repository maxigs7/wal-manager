'use client';
import AddIcon from '@mui/icons-material/Add';
import Button, { ButtonProps } from '@mui/material/Button';

import { NextLinkComposed } from '../link';

export type CreateButtonProps = ButtonProps & { href?: string };

const CreateButton: React.FC<CreateButtonProps> = ({
  children,
  variant = 'contained',
  href,
  ...buttonProps
}) => {
  const linkProps = href ? { component: NextLinkComposed, to: href, prefetch: false } : {};
  return (
    <Button {...linkProps} startIcon={<AddIcon />} variant={variant} {...buttonProps}>
      {children}
    </Button>
  );
};

export { CreateButton };
