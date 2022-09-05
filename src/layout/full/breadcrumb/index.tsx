import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import { Icon } from '@shared';

import { useLayout } from '../provider';

export interface IBreadcrumbItem {
  label: string;
  link?: string;
}

export const Breadcrumb: React.FC = () => {
  const { breadcrumb } = useLayout();
  return (
    <ChakraBreadcrumb separator={<Icon icon="chevron-right" />} spacing="8px">
      {breadcrumb.map((item) => (
        <BreadcrumbItem key={item.label}>
          <BreadcrumbLink href={item.link || '#'} isCurrentPage={!item.link}>
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};
