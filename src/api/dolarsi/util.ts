import { addMinutes } from 'date-fns';

import { QuotationType } from '@models';

import {
  DolarsiList,
  DolarsiName,
  DOLARSI_DATA_KEY,
  DOLARSI_EXPIRATION_MINUTES,
  DOLARSI_RESPONSE_KEYS,
  IDolarsi,
  IDolarsiLocalStorage,
  IDolarsiResponse,
} from './types';

const getKey = (key: DolarsiName): QuotationType => DolarsiList.get(key) as QuotationType;

export const parseResponse = (data: IDolarsiResponse[]): IDolarsi[] =>
  data
    .filter((i: IDolarsiResponse) => DOLARSI_RESPONSE_KEYS.includes(i.casa.nombre as DolarsiName))
    .map((i) => ({
      key: getKey(i.casa.nombre as DolarsiName),
      name: i.casa.nombre as DolarsiName,
      price: parseFloat(i.casa.venta.replace(',', '.')),
    }));

export const parsedLocalStorage = (): IDolarsi[] | undefined => {
  if (!window.localStorage) return;
  const savedData = window.localStorage.getItem(DOLARSI_DATA_KEY);
  if (!savedData) return;

  const parsedData = JSON.parse(savedData) as IDolarsiLocalStorage;
  if (new Date() > new Date(parsedData.expiration)) return;

  return parsedData.data;
};

export const persistData = (data: IDolarsi[]) => {
  if (!window.localStorage) return;

  window.localStorage.setItem(
    DOLARSI_DATA_KEY,
    JSON.stringify({
      data,
      expiration: addMinutes(new Date(), DOLARSI_EXPIRATION_MINUTES).getTime(),
    }),
  );
};

export const getName = (val: QuotationType): DolarsiName => {
  let quotation = '';
  DolarsiList.forEach((v, k) => {
    if (v === val) {
      quotation = k;
      return;
    }
  });
  return quotation as DolarsiName;
};
