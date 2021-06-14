import React from 'react';

import classnames from 'classnames';

const CardContainer: React.FC<React.ComponentPropsWithoutRef<any>> = ({ className, children }) => (
  <div className={classnames('container bg-white rounded shadow-md', className)}>{children}</div>
);

export default CardContainer;
