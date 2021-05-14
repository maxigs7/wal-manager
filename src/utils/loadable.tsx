import React, { lazy, Suspense } from 'react';

interface Opts {
  fallback: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
}

const loadable = <T extends Promise<any>, U extends React.ComponentType<any>>(
  importFunc: () => T,
  opts: Opts,
): React.ComponentType<any> => {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<U>): JSX.Element => (
    <Suspense fallback={opts.fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
