import { routes } from '@/routes';

import accounts from './accounts/es-AR';
import categories from './categories/es-AR';
import creditCards from './credit-cards/es-AR';

const translations = {
  accounts,
  categories,
  creditCards,
  menu: {
    [routes.settings.account.index]: 'Cuentas',
    [routes.settings.category.index]: 'Categorias',
    [routes.settings.creditCard.index]: 'Tarjetas',
    [routes.settings.investments.index]: 'Inversiones',
    [routes.settings.user]: 'Usuario',
  },
};

export default translations;
