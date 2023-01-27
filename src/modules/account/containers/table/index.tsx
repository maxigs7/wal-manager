import React from 'react';

import { AccountTable } from '../../components';
import { useAccountSelectAll } from '../../hooks';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const AccountTableContainer: React.FC<IProps> = ({ onRemove, onUpdate }) => {
  const { data: accounts, isLoading } = useAccountSelectAll();

  return (
    <AccountTable
      data={accounts || []}
      isLoading={isLoading}
      onRemove={onRemove}
      onUpdate={onUpdate}
    />
  );
};

export { AccountTableContainer };
