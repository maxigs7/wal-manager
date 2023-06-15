import React from 'react';

import { Icon as ChakraIcon } from '@chakra-ui/react';

import { IconType, MenuItem, getIcon } from '@/models';

type Props = Pick<MenuItem, 'icon'>;

export const MenuItemIcon: React.FC<Props> = ({ icon }) => {
  const Icon = getIcon(icon as IconType);

  return Icon && <ChakraIcon as={Icon} boxSize="4" />;
};
