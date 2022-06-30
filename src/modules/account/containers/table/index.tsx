import React from 'react';

import { ContentLoader, useTextFilter } from '@shared';

import { AccountTable } from '../../components';
import { useAccountList } from '../../hooks';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const Table: React.FC<IProps> = ({ onRemove, onUpdate }) => {
  const [{ text }] = useTextFilter();
  const { data: accounts, isLoading } = useAccountList(text);

  if (isLoading) {
    return <ContentLoader />;
  }

  return <AccountTable data={accounts || []} minH="80" onRemove={onRemove} onUpdate={onUpdate} />;
};

export default React.memo(Table);
