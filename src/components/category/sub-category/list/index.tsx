import React from 'react';

import { SubCategory } from '@app/api/categories';
import classnames from '@lib/classnames';

import { Skeleton } from '../../skeleton';

interface Props {
  categories?: SubCategory[];
  isLoading: boolean;
}

const styles = {
  listWrapper: (isLoading: boolean) => classnames(isLoading && 'p-5'),
};

export const SubCategoryList: React.FC<Props> = React.memo(({ categories, isLoading }) => {
  console.log('SubCategoryList component rendering...');

  if (isLoading || !categories)
    return (
      <div className={styles.listWrapper(isLoading)}>
        <Skeleton color="bg-white" lines={4} />
      </div>
    );

  return (
    <>
      <div className={styles.listWrapper(isLoading)}>SUBCATEGORIES</div>
    </>
  );
});
