'use client';

import React, { useCallback } from 'react';

import { es } from '@/i18n';
import { useModalManager } from '@/m/shared/modal-manager/provider';
import { ModalKey } from '@/m/shared/modal-manager/types';
import { CreditCard } from '@/models';

import { useCreditCardSelectAll } from '../query';
import { CreditCardTable } from './table';

export type CreditCardTableContainerProps = {
  data: CreditCard[];
};

const CreditCardTableContainer: React.FC<CreditCardTableContainerProps> = ({ data }) => {
  const { data: creditCards, isLoading } = useCreditCardSelectAll(data);
  const { onOpen } = useModalManager();

  const onRemove = useCallback(
    (creditCard: CreditCard) => {
      onOpen(
        ModalKey.CREDIT_CARD_DELETE,
        { title: es.creditCard.pages.remove.title },
        { id: creditCard.id, name: creditCard.name },
      );
    },
    [onOpen],
  );

  return <CreditCardTable data={creditCards || []} isLoading={isLoading} onRemove={onRemove} />;
};

export { CreditCardTableContainer };
