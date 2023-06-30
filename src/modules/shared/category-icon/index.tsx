'use client';
import React, { useMemo } from 'react';

import { Icon, IconProps, Tooltip } from '@chakra-ui/react';

import { es } from '@/i18n';

import { ICON_OPTIONS } from '../form/icon-select/icons';
import { WarningIcon } from '../icons';

type Props = IconProps & {
  category: string;
};

const CategoryIcon: React.FC<Props> = ({ boxSize = '4', category, ...props }) => {
  const iconToRender = useMemo(() => ICON_OPTIONS.find((i) => i.value === category), [category]);
  return (
    <Tooltip label={iconToRender ? iconToRender.label : es.category.iconNotFound} hasArrow>
      <Icon
        as={iconToRender?.icon || WarningIcon}
        boxSize={boxSize}
        color={iconToRender ? undefined : 'yellow.500'}
        {...props}
      />
    </Tooltip>
  );
};

export { CategoryIcon };
