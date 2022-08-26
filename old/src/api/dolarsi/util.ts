import { addMinutes } from 'date-fns';

import {
  DOLARSI_DATA_KEY,
  DOLARSI_EXPIRATION_MINUTES,
  dollars,
  DollarType,
  IDolarsi,
  IDolarsiLocalStorage,
  IDolarsiResponse,
} from './types';

export const parseResponse = (data: IDolarsiResponse[]): IDolarsi[] =>
  data
    .filter((i: IDolarsiResponse) => dollars.includes(i.casa.nombre as DollarType))
    .map((i) => ({
      name: i.casa.nombre as DollarType,
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
