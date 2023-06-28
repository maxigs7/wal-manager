import {
  AccountType,
  CreditCardType,
  Currency,
  InvestmentType,
  MovementType,
  QuotationType,
} from './database.enums';

export const colorTransform = (categoryColor: string) =>
  categoryColor === 'black' ? categoryColor : `${categoryColor}.400`;

export const getAccountTypeName = (type: AccountType): string => {
  switch (type) {
    case 'bank':
      return 'Banco';
    case 'cash':
      return 'Efectivo';
    default:
      return '';
  }
};

export const getCreditCardTypeName = (type: CreditCardType): string => {
  switch (type) {
    case 'amex':
      return 'American Express';
    case 'carrefour':
      return 'Carrefour';
    case 'mastercard':
      return 'Mastercard';
    case 'naranja':
      return 'Naranja';
    case 'visa':
      return 'Visa';
    default:
      return '';
  }
};

export const getCurrencyName = (currency: Currency): string => {
  return currency.toUpperCase();
};

export const getInvestmentTypeName = (type: InvestmentType): string => {
  switch (type) {
    case 'fci':
      return 'Fondo Común de Invesión';
    case 'fixed':
      return 'Plazo Fijo';
    case 'uva':
      return 'Plazo Fijo UVA';
    default:
      return '';
  }
};

export const getMovementTypeName = (type: MovementType): string => {
  switch (type) {
    case 'expenses':
      return 'Gasto';
    case 'incomes':
      return 'Ingreso';
    case 'investment':
      return 'Inversión';
    case 'transfer':
      return 'Transferencia';
    default:
      return '';
  }
};

export const quotationNames = new Map<QuotationType, string>([
  ['blue', 'Dolar Blue'],
  ['mep', 'Dolar Bolsa'],
  ['ccl', 'Dolar Contado con Liqui'],
  ['usd', 'Dolar Oficial'],
  ['usd+', 'Dolar Solidario'],
]);
export const getQuotationTypeName = (type: QuotationType): string => {
  return quotationNames.get(type) || '';
};
