import { useRoutes as useReactRoutes } from 'react-router-dom';

import { CreatePage } from './create';
import { DeletePage } from './delete';
import { EditPage } from './edit';

export const index = '/admin/credit-cards';
export const create = 'create';
export const edit = (id: string): string => `edit/${id}`;
export const remove = (id: string): string => `remove/${id}`;

export const useRoutes = (): React.ReactElement | null => {
  return useReactRoutes([
    {
      path: create,
      element: <CreatePage />,
    },
    {
      path: edit(':id'),
      element: <EditPage />,
    },
    {
      path: remove(':id'),
      element: <DeletePage />,
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/admin/credit-cards" />,
    // },
  ]);
};
