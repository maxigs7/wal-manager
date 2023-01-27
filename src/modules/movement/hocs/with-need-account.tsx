import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAccountSelectAll } from '@m/account';
import { routes } from '@routes';
import { PageLoader } from '@shared';

export const withNeedAccount = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithNeedAccount = (props: T) => {
    const { data, isLoading, isSuccess } = useAccountSelectAll();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && isSuccess && !data?.length) {
        router.push(routes.noAccount);
      }
    }, [data, isLoading, isSuccess, router]);

    if (isLoading) {
      return <PageLoader />;
    }
    // props comes afterwards so the can override the default ones.
    return <>{<WrappedComponent {...(props as T)} />}</>;
  };

  ComponentWithNeedAccount.displayName = `withNeedAccount(${displayName})`;

  return ComponentWithNeedAccount;
};
