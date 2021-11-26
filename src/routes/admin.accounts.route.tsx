import { useRoutes } from 'react-router-dom';

import { CreatePage } from '@pages/admin/accounts/create';
import { DeletePage } from '@pages/admin/accounts/delete';
import { EditPage } from '@pages/admin/accounts/edit';

import { useAccountsNav } from './hooks';

export const useAccountsRoutes = (): React.ReactElement | null => {
  const { to } = useAccountsNav();
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
