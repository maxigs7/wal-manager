const routes = {
  create: (parentId?: string) => `/settings/categories${parentId ? `/${parentId}` : ''}/create`,
  index: `/settings/categories`,
  move: (parentId: string, id: string) => `/settings/categories/${parentId}/${id}/move`,
  update: (id: string, parentId?: string) =>
    `/settings/categories${parentId ? `/${parentId}` : ''}/${id}`,
};

export default routes;
