'use client';

import React, { useCallback } from 'react';

import { es } from '@/i18n';
import { useModalManager } from '@/m/shared/modal-manager/provider';
import { ModalKey } from '@/m/shared/modal-manager/types';
import { Account } from '@/models';

import { useAccountSelectAll } from '../query';
import { AccountTable } from './table';

export type AccountTableContainerProps = {
  data: Account[];
};

const AccountTableContainer: React.FC<AccountTableContainerProps> = ({ data }) => {
  const { data: accounts, isLoading } = useAccountSelectAll(data);
  const { onOpen } = useModalManager();

  const onRemove = useCallback(
    (account: Account) => {
      onOpen(
        ModalKey.ACCOUNT_DELETE,
        { title: es.account.pages.remove.title },
        { id: account.id, name: account.name },
      );
    },
    [onOpen],
  );

  return <AccountTable data={accounts || []} isLoading={isLoading} onRemove={onRemove} />;
};

export { AccountTableContainer };
