export type InvestmentType = 'fci' | 'fixed' | 'uva';
export const DEFAULT_INVESTMENT_TYPE: InvestmentType = 'fixed';

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

export const isAutomatic = (type: InvestmentType): boolean => type === 'fixed';
