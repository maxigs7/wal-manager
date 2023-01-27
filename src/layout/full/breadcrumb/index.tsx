import Link from 'next/link';
import React from 'react';

import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

import { Icon } from '@shared';

import { useLayout } from '../provider';

export interface IBreadcrumbItem {
  label: string;
  link?: string;
  as?: string;
}

export const Breadcrumb: React.FC = () => {
  const { breadcrumb } = useLayout();
  return (
    <ChakraBreadcrumb separator={<Icon icon="chevron-right" />} spacing="8px">
      {breadcrumb.map((item) => (
        <BreadcrumbItem key={item.label}>
          {item.link && (
            <Link as={item.as} href={item.link} legacyBehavior passHref>
              <BreadcrumbLink href={item.link} isCurrentPage={!item.link}>
                {item.label}
              </BreadcrumbLink>
            </Link>
          )}
          {!item.link && <BreadcrumbLink isCurrentPage>{item.label}</BreadcrumbLink>}
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};
