const routes = {
  create: `/settings/accounts/create`,
  index: `/settings/accounts`,
  delete: (id: string) => `/settings/accounts/delete/${id}`,
  update: (id: string) => `/settings/accounts/${id}`,
};

export default routes;
