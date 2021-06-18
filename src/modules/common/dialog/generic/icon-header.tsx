import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classnames from '@lib/classnames';

import { DialogTypes, DialogTypesBackgroundMap, DialogTypesIconsMap, Types } from '../types';

interface IProps {
  type: DialogTypes | Types;
}

const styles = {
  common: classnames(
    'rounded-full flex justify-center items-center',
    'w-24 h-24',
    'absolute top-0 left-1/2',
    'transform -translate-x-1/2 -translate-y-1/2',
  ),
};

export const IconHeader: React.FC<IProps> = ({ type }) => (
  <div className={classnames(styles.common, DialogTypesBackgroundMap[type])}>
    <FontAwesomeIcon className="text-white" icon={DialogTypesIconsMap[type]} size="3x" fixedWidth />
  </div>
);
