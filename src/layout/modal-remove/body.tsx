import React, { PropsWithChildren } from 'react';

import { AlertDialogBody } from '@chakra-ui/react';

const Body: React.FC<PropsWithChildren> = ({ children }) => {
  return <AlertDialogBody>{children}</AlertDialogBody>;
};

export { Body };
