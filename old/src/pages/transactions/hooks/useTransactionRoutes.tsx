import { useRoutes } from 'react-router-dom';

import { ClonePage } from '../clone';
import { CreatePage } from '../create';
import { RemovePage } from '../remove';
import { UpdatePage } from '../update';

export const useTransactionRoutes = (): React.ReactElement | null => {
  return useRoutes([
    {
      path: 'clone/:id',
      element: <ClonePage />,
    },
    {
      path: ':type/create',
      element: <CreatePage />,
    },
    {
      path: 'remove/:id',
      element: <RemovePage />,
    },
    {
      path: 'update/:id',
      element: <UpdatePage />,
    },
  ]);
};
