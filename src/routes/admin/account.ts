const routes = {
  create: '/admin/accounts/create',
  index: '/admin/accounts',
  update: (id: string) => `/admin/accounts/${id}`,
};

export default routes;
