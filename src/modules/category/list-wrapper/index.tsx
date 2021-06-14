import React from 'react';

import classnames from '@lib/classnames';

const styles = {
  wrapper: 'bg-white',
};

export const ListWrapper: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
  children,
  className,
  ...props
}) => (
  <div className={classnames(styles.wrapper, className)} {...props}>
    {children}
  </div>
);
