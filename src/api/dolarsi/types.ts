import { QuotationType } from '@models';

export const DOLARSI_RESPONSE_KEYS = [
  'Dolar Blue',
  'Dolar Bolsa',
  'Dolar Contado con Liqui',
  'Dolar Oficial',
  'Dolar Solidario',
] as const;

export type DolarsiName = typeof DOLARSI_RESPONSE_KEYS[number];

export const DolarsiList = new Map<DolarsiName, QuotationType>([
  ['Dolar Blue', 'blue'],
  ['Dolar Bolsa', 'mep'],
  ['Dolar Contado con Liqui', 'ccl'],
  ['Dolar Oficial', 'usd'],
  ['Dolar Solidario', 'usd+'],
]);
export type DolarsiType = { key: QuotationType; name: DolarsiName };

export interface IDolarsiResponse {
  casa: IDolarsiItemResponse;
}

export interface IDolarsiItemResponse {
  compra: string;
  venta: string;
  nombre: string;
}

export interface IDolarsi extends DolarsiType {
  price: number;
}

export const DOLARSI_DATA_KEY = 'dolarsi';
export const DOLARSI_EXPIRATION_MINUTES = 60;

export interface IDolarsiLocalStorage {
  data: IDolarsi[];
  expiration: number;
}
