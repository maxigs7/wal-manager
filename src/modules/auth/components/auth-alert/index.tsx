import { Alert, AlertIcon, AlertProps } from '@chakra-ui/react';

const AuthAlert: React.FC<AlertProps> = ({ children, status, ...props }) => {
  return (
    <Alert status={status} {...props}>
      <AlertIcon />
      {children}
    </Alert>
  );
};

export { AuthAlert };
