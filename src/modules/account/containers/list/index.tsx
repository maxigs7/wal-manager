import React from 'react';

import { Account } from '@models';
import { CardPlaceholder, ContentLoader, Icon } from '@shared';

import { AccountList } from '../../components';
import { useAccountList } from '../../hooks';

interface IProps {
  onCreate?(): void;
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
}

const List: React.FC<IProps> = ({ onCreate, onDelete, onSelected }) => {
  const { data: accounts, isLoading } = useAccountList();

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <AccountList accounts={accounts || []} onDelete={onDelete} onSelected={onSelected}>
      <CardPlaceholder onClick={onCreate}>
        <Icon icon="plus" mb={3} size="3x" />
        Añadir Cuenta
      </CardPlaceholder>
    </AccountList>
  );
};

export default List;
