import { useCallback } from 'react';

import { useRouter } from '@hooks';

const PREFIX = '/admin/credit-cards';
const ROUTES = {
  create: 'create',
  index: '',
  edit: 'edit',
  remove: 'remove',
};

type RouteType = 'create' | 'edit' | 'index' | 'remove';
type Options = { type: RouteType; id?: string; full?: boolean; state?: any };
type UseCreditCardsNav = () => { nav(opt: Options): void; to(opt: Options): string };

export const useCreditCardsNav: UseCreditCardsNav = () => {
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
