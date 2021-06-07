import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Category } from '@app/api/categories';
import classnames from '@lib/classnames';

import { Skeleton } from '../skeleton';

interface Props {
  category?: Category;
  isLoading: boolean;
}

const styles = {
  icon: (color: string) => classnames('rounded-full text-white p-2 mr-1', color),
  title: 'flex-1 text-2xl',
  wrapper: 'p-5 flex border-b border-white',
};

export const CategoryTitle: React.FC<Props> = React.memo(({ category, isLoading }) => {
  console.log('CategoryTitle component rendering...');

  if (isLoading || !category) return <Skeleton lines={1} />;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <span className={styles.icon(category.color)}>
          <FontAwesomeIcon icon={category.icon} fixedWidth />
        </span>
        {category.name}
      </h2>
    </div>
  );
});
