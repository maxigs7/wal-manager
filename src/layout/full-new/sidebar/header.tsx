import 'server-only';

import NextLink from 'next/link';
import React from 'react';

import { Link } from '@nextui-org/link';

import { classnames } from '@/lib/classnames';
import { LogoIcon } from '@/m/shared/icons';
import { routes } from '@/routes';

const SidebarHeader: React.FC = () => (
  <Link
    as={NextLink}
    className={classnames('flex items-center justify-center px-3')}
    href={routes.dashboard}
    prefetch={false}
    underline="none"
  >
    <LogoIcon className="w-12 h-12 text-white fill-primary-400" />
  </Link>
);

export { SidebarHeader };
