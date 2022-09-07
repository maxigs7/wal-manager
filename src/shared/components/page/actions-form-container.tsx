import { Flex, FlexProps } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const ActionsFormContainer: React.FC<PropsWithChildren & FlexProps> = ({
  children,
  ...flexProps
}) => {
  return (
    <Flex
      borderBottom="solid"
      borderBottomColor="gray.300"
      borderBottomWidth="thin"
      borderTop="solid"
      borderTopColor="gray.300"
      borderTopWidth="thin"
      gap="3"
      px="5"
      py="3"
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

export { ActionsFormContainer };
