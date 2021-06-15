import React from 'react';

import classnames from '@lib/classnames';

const styles = {
  card: 'container bg-white rounded shadow-md',
};

const CardContainer: React.FC<React.ComponentPropsWithoutRef<any>> = ({ className, children }) => (
  <div className={classnames(styles.card, className)}>{children}</div>
);

export default React.memo(CardContainer);
