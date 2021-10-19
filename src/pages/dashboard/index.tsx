import React from 'react';

import { Page } from '@lib/wal-ui';

const DashboardPage: React.FC = () => {
  console.log('DashboardPage Rendering');
  return <Page metaTitle="Dashboard" title="Dashboard"></Page>;
};

export default DashboardPage;
