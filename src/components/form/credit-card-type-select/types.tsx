import { ReactElement } from 'react';

import { ReactComponent as AmexIcon } from '@assets/images/cc-amex.svg';
import { ReactComponent as GenericIcon } from '@assets/images/cc-generic.svg';
import { ReactComponent as MasterCardIcon } from '@assets/images/cc-mastercard.svg';
import { ReactComponent as VisaIcon } from '@assets/images/cc-visa.svg';
import { CreditCardType } from '@models/common';

export interface ICreditCardTypeOption {
  icon: ReactElement;
  label: string;
  value: CreditCardType;
}

export const creditCardTypes: ICreditCardTypeOption[] = [
  {
    icon: <AmexIcon height={30} />,
    label: 'American Express',
    value: CreditCardType.amex,
  },
  {
    icon: <GenericIcon height={30} />,
    label: 'Carrefour',
    value: CreditCardType.carrefour,
  },
  {
    icon: <MasterCardIcon height={30} />,
    label: 'Mastercard',
    value: CreditCardType.mastercard,
  },
  {
    icon: <VisaIcon height={30} />,
    label: 'VISA',
    value: CreditCardType.visa,
  },
];
