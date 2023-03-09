import React from 'react';

import { Loader } from './loader';

const PageLoader: React.FC = () => (
  <div className="h-scren fixed top-0 left-0 z-50 w-screen items-center justify-center bg-white opacity-75">
    <Loader />
  </div>
);

export { PageLoader };
