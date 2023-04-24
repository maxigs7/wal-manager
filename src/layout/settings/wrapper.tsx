import { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex flexDirection={{ base: 'column', lg: 'row' }} h="full" w="full">
      {children}
    </Flex>
  );
};

export { Wrapper };
