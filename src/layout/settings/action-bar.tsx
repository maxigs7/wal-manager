import { Flex, FlexProps } from '@chakra-ui/react';

export const ActionBar: React.FC<FlexProps> = ({
  children,
  borderBottomColor = 'gray.100',
  borderBottomWidth = '1px',
  gap = '3',
  p = '3',
  ...props
}) => {
  return (
    <Flex
      borderBottomColor={borderBottomColor}
      borderBottomWidth={borderBottomWidth}
      gap={gap}
      p={p}
      {...props}
    >
      {children}
    </Flex>
  );
};
