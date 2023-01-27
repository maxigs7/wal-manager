const routes = {
  create: '/movements/create',
  index: '/movements',
  update: (id: string) => `/movements/${id}`,
};

export default routes;
