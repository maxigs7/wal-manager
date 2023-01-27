import accountRoute from './account';
import categoryRoute from './category';
import creditCardRoute from './creditCard';

const admin = {
  account: accountRoute,
  category: categoryRoute,
  creditCard: creditCardRoute,
  index: '/admin',
};

export default admin;
