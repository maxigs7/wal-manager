import React from 'react';

import classnames from 'classnames';

import { IReactProps } from '@app/common/interfaces/react-props';

const CardContainer: React.FC<IReactProps> = ({ className, children }: IReactProps) => (
  <div className={classnames('container bg-white rounded shadow-md', className)}>{children}</div>
);

export default CardContainer;
