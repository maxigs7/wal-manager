import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Account, useAccountListRefresh } from '@entities';
import { AccountDialogRemove } from '@features';
import { useRouter } from '@shared';

import { useAccountNav } from './hooks';

const RemovePage: React.FC = () => {
  const {
    params: { id },
  } = useRouter();
  const { goIndex } = useAccountNav();
  const refresh = useAccountListRefresh();

  const onConfirmed = (account: Account) => {
    refresh(account.id);
    onDismiss();
  };

  const onDismiss = () => {
    goIndex();
  };

  return (
    <>
      <Helmet>
        <title>Eliminar Cuenta - WAL</title>
      </Helmet>
      <AccountDialogRemove id={id} isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { RemovePage };
