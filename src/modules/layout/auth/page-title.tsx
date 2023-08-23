import 'server-only';

import { PropsWithChildren } from 'react';

import Typography, { TypographyProps } from '@mui/material/Typography';

const PageTitle: React.FC<PropsWithChildren & TypographyProps> = ({
  children,
  component = 'h1',
  color = 'text.secondary',
  mt = '5',
  variant = 'h5',
  ...props
}) => {
  return (
    <Typography color={color} component={component} mt={mt} variant={variant} {...props}>
      {children}
    </Typography>
  );
};

export default PageTitle;
