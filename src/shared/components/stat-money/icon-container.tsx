import React from 'react';

import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../icon';

interface IProps extends BoxProps {
  icon: IconName;
}

const StatIconContainer: React.FC<IProps> = ({ children, icon, ...boxProps }) => {
  const bgIcon = useColorModeValue('primary.200', 'primary.500');
  const colorIcon = useColorModeValue('primary.500', 'primary.200');

  return (
    <Box
      alignContent="center"
      display="inline-flex"
      flexBasis="100%"
      justifyContent="center"
      maxW="xs"
      minW={['xs', 'xs', null]}
      px="4"
      py="2"
      {...boxProps}
    >
      <Icon bg={bgIcon} color={colorIcon} icon={icon} mr="3" p="3" rounded="full" size="2x" />
      {children}
    </Box>
  );
};

export { StatIconContainer };
