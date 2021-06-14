import React from 'react';

import { SkeletonLine } from '@app/modules/common';

import { ListWrapper } from '../list-wrapper';

const styles = {
  wrapper: 'p-5',
};

export const ListSkeleton: React.FC = React.memo(() => (
  <ListWrapper className={styles.wrapper}>
    <SkeletonLine lines={4} />
  </ListWrapper>
));
