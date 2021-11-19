import React from 'react';

import { AccountsList, AccountPortalModal } from '@containers';
import { Page } from '@lib/wal-ui';
import { useAccountStore } from '@stores';

const AccountsPage: React.FC = () => {
  const [state, dispatch] = useAccountStore();

  return (
    <>
      <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
        <AccountsList
          onCreate={dispatch.onOpenForm}
          onDelete={(account) => dispatch.onOpenForm(account, true)}
          onSelected={(account) => dispatch.onOpenForm(account)}
        />
        <AccountPortalModal
          id={state.id}
          isOpenForm={state.isOpenForm}
          isOpenRemove={state.isOpenRemove}
          onConfirmed={dispatch.onConfirmedForm}
          onDismiss={dispatch.onDismissForm}
        />
      </Page>
    </>
  );
};

export default AccountsPage;
