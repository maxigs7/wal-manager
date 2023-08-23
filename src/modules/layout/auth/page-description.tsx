import 'server-only';

import { PropsWithChildren } from 'react';

import Typography, { TypographyProps } from '@mui/material/Typography';

const PageDescription: React.FC<PropsWithChildren & TypographyProps> = ({
  alignSelf = 'start',
  color = 'text.secondary',
  variant = 'body1',
  children,
  ...props
}) => {
  return (
    <Typography alignSelf={alignSelf} color={color} variant={variant} {...props}>
      {children}
    </Typography>
  );
};

export default PageDescription;
