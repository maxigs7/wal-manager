export const dollars = [
  'Dolar Blue',
  'Dolar Bolsa',
  'Dolar Contado con Liqui',
  'Dolar Oficial',
  'Dolar Solidario',
] as const;
export type DollarType = typeof dollars[number];

export interface IDolarsiResponse {
  casa: IDolarsiItemResponse;
}

export interface IDolarsiItemResponse {
  compra: string;
  venta: string;
  nombre: string;
}

export interface IDolarsi {
  name: DollarType;
  price: number;
}

export const DOLARSI_DATA_KEY = 'dolarsi';
export const DOLARSI_EXPIRATION_MINUTES = 60;

export interface IDolarsiLocalStorage {
  data: IDolarsi[];
  expiration: number;
}
