import React from 'react';

import Skeleton from '@mui/material/Skeleton';

const TableSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton height={60} variant="rectangular" />
      <Skeleton height={60} variant="rectangular" />
      <Skeleton height={60} variant="rectangular" />
    </>
  );
};

export default TableSkeleton;
