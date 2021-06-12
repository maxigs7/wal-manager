import React from 'react';

import classnames from '@lib/classnames';

const styles = {
  wrapper: 'bg-white',
};

export const CategoriesWrapper: React.FC<React.ComponentPropsWithoutRef<'div'>> = React.memo(
  ({ children, className, ...props }) => (
    <div className={classnames(styles.wrapper, className)} {...props}>
      {children}
    </div>
  ),
);
