import { ReactElement } from 'react';

import { CreditCardType, getCreditCardTypeName } from '@/models';

import { CreditCardTypeIcon } from '../../credit-card-type-icon';
import { SelectOption } from '../../models';

export type CreditCardTypeOption = SelectOption<CreditCardType> & {
  icon: ReactElement;
};

export const CREDIT_CARD_TYPE_OPTIONS: CreditCardTypeOption[] = [
  {
    icon: <CreditCardTypeIcon height={30} type={'amex'} />,
    label: getCreditCardTypeName('amex'),
    value: 'amex',
  },
  {
    icon: <CreditCardTypeIcon height={30} type={'carrefour'} />,
    label: getCreditCardTypeName('carrefour'),
    value: 'carrefour',
  },
  {
    icon: <CreditCardTypeIcon height={30} type={'mastercard'} />,
    label: getCreditCardTypeName('mastercard'),
    value: 'mastercard',
  },
  {
    icon: <CreditCardTypeIcon height={30} type={'naranja'} />,
    label: getCreditCardTypeName('naranja'),
    value: 'naranja',
  },
  {
    icon: <CreditCardTypeIcon height={30} type={'visa'} />,
    label: getCreditCardTypeName('visa'),
    value: 'visa',
  },
];
