import React from 'react';
import { useForm } from 'react-hook-form';

import {
  AccountForm,
  CreditCardForm,
  CreditCardList,
  CreditCardNewPlaceholder,
} from '@app/components';
import { Account } from '@app/models/accounts';
import { CreditCardType } from '@app/models/common';
import { CreditCard } from '@app/models/credit-cards';
import { Card, Page } from '@lib/wal-ui';

const creditCards: CreditCard[] = [
  {
    id: 'amex-id',
    type: CreditCardType.amex,
    name: 'Amex',
    userId: '',
  },
  {
    id: 'carrefour-id',
    type: CreditCardType.carrefour,
    name: 'Carrefour',
    userId: '',
  },
  {
    id: 'mastercard-id',
    type: CreditCardType.mastercard,
    name: 'Mastercard',
    userId: '',
  },
  {
    id: 'visa-id',
    type: CreditCardType.visa,
    name: 'VISA',
    userId: '',
  },
  {
    id: 'visa2-id',
    type: CreditCardType.visa,
    name: 'VISA 2',
    userId: '',
  },
];

const DashboardPage: React.FC = () => {
  const accountForm = useForm<Account>();
  const ccForm = useForm<CreditCard>();
  console.log('DashboardPage Rendering');
  return (
    <Page metaTitle="Dashboard" title="Dashboard">
      <Card p={5}>
        <AccountForm {...accountForm} account={undefined} />
      </Card>
      <Card mt={5} p={5}>
        <CreditCardForm {...ccForm} cc={undefined} />
      </Card>

      <CreditCardList creditCards={creditCards}>
        <CreditCardNewPlaceholder />
      </CreditCardList>
    </Page>
  );
};

export default DashboardPage;
