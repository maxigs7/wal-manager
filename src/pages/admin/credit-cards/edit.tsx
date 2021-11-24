import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useCreditCardRefresh } from '@api';
import { CreditCardModalForm } from '@containers';
import { useRouter } from '@hooks';
import { CreditCard } from '@models';

import { index } from './routes';

const EditPage: React.FC = () => {
  const { navigate, params } = useRouter();
  const refresh = useCreditCardRefresh();

  const onConfirmed = (cc: CreditCard) => {
    refresh(cc.id);
    navigate(index);
  };

  const onDismiss = () => {
    navigate(index);
  };

  return (
    <>
      <Helmet>
        <title>Editar Tarjeta - WAL</title>
      </Helmet>
      <CreditCardModalForm
        id={params.id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { EditPage };
