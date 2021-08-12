import React from 'react';

import { StackProps, VStack } from '@chakra-ui/react';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

import { Icon } from '@lib/chakra-ui';

const EmptyMessage: React.FC<IProps> = ({
  icon = 'inbox',
  iconSize = '5x',
  children,
  ...props
}) => (
  <VStack {...props} align="center" h="full" justify="center" p={4}>
    <Icon icon={icon} size={iconSize} />
    {children}
  </VStack>
);

interface IProps extends StackProps {
  icon?: IconProp;
  iconSize?: SizeProp;
}

export default EmptyMessage;
