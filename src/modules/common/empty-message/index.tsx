import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classnames from '@lib/classnames';

const styles = {
  wrapper: 'flex flex-col justify-center items-center h-full w-full',
};

const Empty: React.FC<React.ComponentPropsWithRef<any>> = React.memo(({ children, className }) => (
  <div className={classnames(styles.wrapper, className)}>
    <FontAwesomeIcon icon="inbox" size="5x" />
    {children}
  </div>
));

export default Empty;
