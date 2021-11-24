import React from 'react';

import { CircularProgress, Flex } from '@chakra-ui/react';

import { useAccountList } from '@api';
import { AccountList, AccountNewPlaceholder } from '@components';
import { Account } from '@models';

const AccountsList: React.FC<IProps> = ({ onCreate, onDelete, onSelected }) => {
  const { data: accounts, isLoading, ...all } = useAccountList();
  console.log(isLoading, all);
  if (isLoading) {
    return (
      <Flex align="center" justify="center" p={5}>
        <CircularProgress color="crimson.300" isIndeterminate />
      </Flex>
    );
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

export { AccountsList };
