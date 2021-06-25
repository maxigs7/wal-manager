import React from 'react';

import { SkeletonLine } from '@app/modules/common';

import { ListWrapper } from '../list-wrapper';

const styles = {
  wrapper: 'p-5 h-full',
};

export const ListSkeleton: React.FC = () => (
  <ListWrapper className={styles.wrapper}>
    <SkeletonLine lines={10} />
  </ListWrapper>
);
