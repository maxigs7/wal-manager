'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import { Account } from '@/models';
import { routes } from '@/routes';

import { AccountTable } from '../../components';
import { useAccountSelectAll } from '../../hooks';

export type AccountTableContainerProps = {
  data: Account[];
};

const AccountTableClient: React.FC<AccountTableContainerProps> = ({ data }) => {
  const { data: accounts, isLoading } = useAccountSelectAll(data);
  const router = useRouter();
  const onRemove = useCallback(
    (id: string) => {
      router.push(routes.settings.account.delete(id));
    },
    [router],
  );
  const onUpdate = useCallback(
    (id: string) => {
      router.push(routes.settings.account.update(id));
    },
    [router],
  );

  return (
    <AccountTable
      data={accounts || []}
      isLoading={isLoading}
      onRemove={onRemove}
      onUpdate={onUpdate}
    />
  );
};

export { AccountTableClient };
