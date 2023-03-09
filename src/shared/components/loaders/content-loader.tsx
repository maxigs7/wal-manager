import React from 'react';

import { Loader } from './loader';

const ContentLoader: React.FC = () => (
  <div className="flex items-center justify-center p-5">
    <Loader />
  </div>
);

export { ContentLoader };
