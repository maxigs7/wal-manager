import { useRoutes } from 'react-router-dom';

import { CreatePage } from '@pages/admin/credit-cards/create';
import { DeletePage } from '@pages/admin/credit-cards/delete';
import { EditPage } from '@pages/admin/credit-cards/edit';

import { useCreditCardsNav } from './hooks';

export const useCreditCardsRoutes = (): React.ReactElement | null => {
  const { to } = useCreditCardsNav();
  return useRoutes([
    {
      path: to({ type: 'create' }),
      element: <CreatePage />,
    },
    {
      path: to({ type: 'edit', id: ':id' }),
      element: <EditPage />,
    },
    {
      path: to({ type: 'remove', id: ':id' }),
      element: <DeletePage />,
    },
  ]);
};
