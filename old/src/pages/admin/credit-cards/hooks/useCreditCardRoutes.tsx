import { useRoutes } from 'react-router-dom';

import { CreatePage } from '../create';
import { RemovePage } from '../remove';
import { UpdatePage } from '../update';

export const useCreditCardRoutes = (): React.ReactElement | null => {
  return useRoutes([
    {
      path: 'create',
      element: <CreatePage />,
    },
    {
      path: 'update/:id',
      element: <UpdatePage />,
    },
    {
      path: 'remove/:id',
      element: <RemovePage />,
    },
  ]);
};
