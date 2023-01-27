const routes = {
  create: (parentId?: string) => `/admin/categories${parentId ? `/${parentId}` : ''}/create`,
  index: '/admin/categories',
  move: (parentId: string, id: string) => `/admin/categories/${parentId}/${id}/move`,
  update: (id: string, parentId?: string) =>
    `/admin/categories${parentId ? `/${parentId}` : ''}/${id}`,
};

export default routes;
