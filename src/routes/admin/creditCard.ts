const routes = {
  create: '/admin/credit-cards/create',
  index: '/admin/credit-cards',
  update: (id: string) => `/admin/credit-cards/${id}`,
};

export default routes;
