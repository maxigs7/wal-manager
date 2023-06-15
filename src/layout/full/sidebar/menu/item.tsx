'use client';
import React from 'react';

import { Badge, Text } from '@chakra-ui/react';

import { motion } from '@/lib/framer-motion';
import { IconType, MenuItem as MenuItemModel } from '@/models';

import { MenuItemIcon } from './icon';
import { MenuItemLink } from './link';

const MotionMenuItemLink = motion(MenuItemLink);

export const MenuItem: React.FC<MenuItemModel> = ({ comingSoon, icon, title, href }) => {
  return (
    <MotionMenuItemLink animate={{ opacity: 1 }} href={href} initial={{ opacity: 0 }} layout>
      <MenuItemIcon icon={icon as IconType} />
      <Text as="span" fontWeight="medium" size="sm">
        {title}
        {comingSoon && (
          <Badge colorScheme="accent" fontSize="xx-small" ml={2} variant="subtle">
            soon
          </Badge>
        )}
      </Text>
    </MotionMenuItemLink>
  );
};
