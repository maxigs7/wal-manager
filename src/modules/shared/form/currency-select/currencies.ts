import { Currency, getCurrencyName } from '@/models';

import { SelectOption } from '../../models';

export const CURRENCY_OPTIONS: SelectOption<Currency>[] = [
  {
    label: getCurrencyName('ars'),
    value: 'ars',
  },
  {
    label: getCurrencyName('usd'),
    value: 'usd',
  },
];
