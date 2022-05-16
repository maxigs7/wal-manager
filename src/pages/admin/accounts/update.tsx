import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { AccountModalFormContainer, useAccountListRefresh } from '@m/account';
import { Account } from '@models';

import { useAccountNav } from './hooks';

const UpdatePage: React.FC = () => {
  const { id } = useParams();
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
      <AccountModalFormContainer
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { UpdatePage };
