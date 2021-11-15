import React from 'react';

import { CreditCardsList, CreditCardPortalModal } from '@containers';
import { Page } from '@lib/wal-ui';
import { useCreditCardStore } from '@stores';

const CreditCardsPage: React.FC = () => {
  const [state, dispatch] = useCreditCardStore();

  return (
    <>
      <Page metaTitle="Mis Tarjetas" title="Mis Tarjetas">
        <CreditCardsList
          onCreate={dispatch.onOpenForm}
          onDelete={(cc) => dispatch.onOpenForm(cc, true)}
          onSelected={(cc) => dispatch.onOpenForm(cc)}
        />
        <CreditCardPortalModal
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

export default CreditCardsPage;
