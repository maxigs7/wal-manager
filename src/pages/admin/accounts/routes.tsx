import { useCallback } from 'react';
import { useRoutes as useReactRoutes } from 'react-router-dom';

import { useRouter } from '@hooks';

import { CreatePage } from './create';
import { DeletePage } from './delete';
import { EditPage } from './edit';

const PREFIX = '/admin/accounts';
const ROUTES = {
  create: 'create',
  index: '',
  edit: 'edit',
  remove: 'remove',
};

type RouteType = 'create' | 'edit' | 'index' | 'remove';
type Options = { type: RouteType; id?: string; full?: boolean; state?: any };

export const useNavigate = (): { nav(opt: Options): void; to(opt: Options): string } => {
  const { navigate } = useRouter();

  const nav = useCallback(({ state, ...options }: Options) => {
    const url = to(options);
    navigate(url, { state });
  }, []);

  const to = useCallback(({ type, id, full = false }: Options) => {
    return [full && PREFIX, ROUTES[type], id].filter(Boolean).join('/');
  }, []);

  return { nav, to };
};

export const useRoutes = (): React.ReactElement | null => {
  const { to } = useNavigate();
  return useReactRoutes([
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
