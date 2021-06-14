import React from 'react';

import { SkeletonLine } from '@app/modules/common';

import { SubCategoriesWrapper } from './wrapper';

const styles = {
  wrapper: 'p-5',
};

export const CategoriesSkeleton: React.FC = React.memo(() => (
  <SubCategoriesWrapper className={styles.wrapper}>
    <SkeletonLine lines={4} />
  </SubCategoriesWrapper>
));
