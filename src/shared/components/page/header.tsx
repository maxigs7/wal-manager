import React, { PropsWithChildren } from 'react';

import { Flex, FlexProps, Heading, useColorModeValue } from '@chakra-ui/react';

interface IProps extends PropsWithChildren {
  title?: string;
}

const PageHeader: React.FC<IProps & Omit<FlexProps, 'bg'>> = ({
  children,
  title,
  align = 'center',
  gap = '3',
  p = '5',
  wrap = 'wrap',
  ...props
}) => {
  const bg = useColorModeValue('primary.400', 'primary.600');
  return (
    <Flex align={align} bg={bg} gap={gap} p={p} wrap={wrap} {...props}>
      {title && (
        <Heading as="h1" color="white">
          {title}
        </Heading>
      )}
      {children}
    </Flex>
  );
};

export { PageHeader };
