import { useRoutes } from 'react-router-dom';

import { CreatePage } from '../create';
import { CreatePage as SubCreatePage } from '../parentId/create';
import { RemovePage as SubRemovePage } from '../parentId/remove';
import { UpdatePage as SubUpdatePage } from '../parentId/update';
import { RemovePage } from '../remove';
import { UpdatePage } from '../update';

export const useCategoryRoutes = (): React.ReactElement | null => {
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
    {
      path: ':parentId/*',
      children: [
        {
          path: 'create',
          element: <SubCreatePage />,
        },
        {
          path: 'remove/:id',
          element: <SubRemovePage />,
        },
        {
          path: 'update/:id',
          element: <SubUpdatePage />,
        },
      ],
    },
  ]);
};
