import React from 'react';

import { ModalFooter, ModalFooterProps } from '@chakra-ui/react';

const Footer: React.FC<ModalFooterProps> = ({ children, ...props }) => (
  <ModalFooter {...props}>{children}</ModalFooter>
);

export default Footer;
