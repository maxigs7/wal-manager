import { Alert, AlertIcon, AlertProps } from '@chakra-ui/react';

const AuthAlert: React.FC<AlertProps> = ({
  children,
  status,
  variant = 'left-accent',
  ...props
}) => {
  return (
    <Alert status={status} variant={variant} {...props}>
      <AlertIcon />
      {children}
    </Alert>
  );
};

export { AuthAlert };
