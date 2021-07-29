import React from 'react';

import { Skeleton } from '@chakra-ui/react';

import { ListWrapper } from '../list-wrapper';

const styles = {
  wrapper: 'p-5',
};

export const ListSkeleton: React.FC = () => (
  <ListWrapper className={styles.wrapper}>
    <Skeleton height="20px" />
    <Skeleton height="20px" />
    <Skeleton height="20px" />
  </ListWrapper>
);
