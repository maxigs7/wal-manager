import React from 'react';

import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classnames from '@lib/classnames';

interface IProps extends React.ComponentPropsWithRef<'div'> {
  icon?: IconProp;
  iconSize?: SizeProp;
}

const styles = {
  wrapper: 'flex flex-col justify-center items-center h-full',
};

const EmptyMessage: React.FC<IProps> = ({
  icon = 'inbox',
  iconSize = '5x',
  children,
  className,
  ...props
}) => (
  <div className={classnames(styles.wrapper, className)} {...props}>
    <FontAwesomeIcon icon={icon} size={iconSize} />
    {children}
  </div>
);

export default EmptyMessage;
