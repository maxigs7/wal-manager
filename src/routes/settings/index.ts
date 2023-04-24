import accountRoute from './account';
import categoryRoute from './category';
import creditCardRoute from './creditCard';
import investmentsRoute from './investments';

const settings = {
  account: accountRoute,
  category: categoryRoute,
  creditCard: creditCardRoute,
  index: '/settings',
  investments: investmentsRoute,
  user: `/settings/user`,
};

export default settings;
