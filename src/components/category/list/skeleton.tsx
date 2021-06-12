import React from 'react';

import { Skeleton } from '../skeleton';
import { CategoriesWrapper } from './wrapper';

const styles = {
  wrapper: 'p-5',
};

export const CategoriesSkeleton: React.FC = React.memo(() => (
  <CategoriesWrapper className={styles.wrapper}>
    <Skeleton lines={4} />
  </CategoriesWrapper>
));
