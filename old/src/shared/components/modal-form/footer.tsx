import React from 'react';

import { ModalFooter, ModalFooterProps } from '@chakra-ui/react';

const Footer: React.FC<ModalFooterProps> = ({
  children,
  p = { base: '0', md: '5' },
  gap = { base: '0', md: '3' },
  ...props
}) => (
  <ModalFooter {...props} gap={gap} p={p}>
    {children}
  </ModalFooter>
);

export default Footer;
