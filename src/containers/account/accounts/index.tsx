import React, { useEffect } from 'react';

import { CircularProgress, Flex } from '@chakra-ui/react';

import { AccountList, AccountNewPlaceholder } from '@app/components';
import { Account } from '@app/models/accounts';

import { useRedux } from './useRedux';

const AccountsList: React.FC<IProps> = ({ onCreate, onDelete }) => {
  const { state, dispatch } = useRedux();

  useEffect(() => {
    dispatch.onAccountsRequest();
  }, []);

  console.log('AccountsPage rendering...');

  return (
    <>
      {state.isLoading && (
        <Flex align="center" justify="center" p={5}>
          <CircularProgress color="crimson.300" isIndeterminate />
        </Flex>
      )}
      {!state.isLoading && (
        <AccountList
          accounts={state.accounts}
          onDelete={onDelete}
          onSelected={dispatch.onAccountSelected}
          selected={state.selected}
        >
          <AccountNewPlaceholder onSelected={onCreate} />
        </AccountList>
      )}
    </>
  );
};

interface IProps {
  onCreate?(): void;
  onDelete?(account: Account): void;
}

export { AccountsList };