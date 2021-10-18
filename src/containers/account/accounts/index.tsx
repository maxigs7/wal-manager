import React, { useEffect } from 'react';

import { CircularProgress } from '@chakra-ui/react';

import { AccountList, AccountNewPlaceholder } from '@app/components';

import { useRedux } from './useRedux';

const AccountsList: React.FC = () => {
  const { state, dispatch } = useRedux();
  console.log('AccountsPage rendering...');

  useEffect(() => {
    dispatch.onAccountsRequest();
  }, []);

  return (
    <>
      {state.isLoading && <CircularProgress color="crimson.300" isIndeterminate />}
      {!state.isLoading && (
        <AccountList accounts={state.accounts}>
          <AccountNewPlaceholder />
        </AccountList>
      )}
    </>
  );
};

export { AccountsList };
