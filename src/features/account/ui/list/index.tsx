import React from 'react';

import { Account, AccountList, AccountNewPlaceholder, useAccountList } from '@entities';
import { ContentLoader } from '@shared';

const List: React.FC<IProps> = ({ onCreate, onDelete, onSelected }) => {
  const { data: accounts, isLoading } = useAccountList();

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <AccountList accounts={accounts || []} onDelete={onDelete} onSelected={onSelected}>
      <AccountNewPlaceholder onSelected={onCreate} />
    </AccountList>
  );
};

interface IProps {
  onCreate?(): void;
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
}

export default List;
