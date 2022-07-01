export type CreditCardType = 'amex' | 'carrefour' | 'mastercard' | 'naranja' | 'visa';
export const DEFAULT_CREDIT_CARD_TYPE: CreditCardType = 'visa';
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
