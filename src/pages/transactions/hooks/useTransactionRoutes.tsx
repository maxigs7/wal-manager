import { useRoutes } from 'react-router-dom';

import { CreatePage } from '../create';
import { RemovePage } from '../remove';
// import { UpdatePage } from '../update';

export const useTransactionRoutes = (): React.ReactElement | null => {
  return useRoutes([
    {
      path: ':type/create',
      element: <CreatePage />,
    },
    // {
    //   path: 'update/:id',
    //   element: <UpdatePage />,
    // },
    {
      path: 'remove/:id',
      element: <RemovePage />,
    },
  ]);
};
