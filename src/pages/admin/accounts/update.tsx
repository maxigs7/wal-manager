import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Account, useAccountListRefresh } from '@entities';
import { AccountModalForm } from '@features';
import { useRouter } from '@shared';

import { useAccountNav } from './hooks';

const UpdatePage: React.FC = () => {
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
        <title>Actualizar Cuenta - WAL</title>
      </Helmet>
      <AccountModalForm id={id} isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { UpdatePage };
