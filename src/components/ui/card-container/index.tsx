import React from 'react';

import { IReactProps } from '@app/common/interfaces/react-props';
import classnames from 'classnames';

const CardContainer: React.FC<IReactProps> = ({ className, children }: IReactProps) => (
  <div className={classnames('container bg-white rounded shadow-md', className)}>{children}</div>
);

export default CardContainer;
