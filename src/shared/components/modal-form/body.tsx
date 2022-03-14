import React from 'react';

import { ModalBody, ModalBodyProps } from '@chakra-ui/react';

import ContentLoader from '../loaders/content-loader';

type Props = ModalBodyProps & { isLoading?: boolean };

const Body: React.FC<Props> = ({ children, isLoading = false, ...props }) => (
  <ModalBody {...props}>
    {isLoading && <ContentLoader />}
    {!isLoading && children}
  </ModalBody>
);

export default Body;
