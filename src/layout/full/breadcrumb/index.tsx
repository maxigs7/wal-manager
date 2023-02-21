'use client';

import Link from 'next/link';
import React from 'react';

import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from '@chakra-ui/react';

import { ChevronRight } from '@/lib/svg';

import { useLayout } from '../provider';

export interface IBreadcrumbItem {
  label: string;
  link?: string;
  as?: string;
}

export const Breadcrumb: React.FC = () => {
  const { breadcrumb = [] } = useLayout();
  return (
    <ChakraBreadcrumb separator={<Icon as={ChevronRight} fill="current" />} spacing="8px">
      {breadcrumb.map((item) => (
        <BreadcrumbItem key={item.label}>
          {item.link && (
            <Link as={item.as} href={item.link} prefetch={false} legacyBehavior passHref>
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
