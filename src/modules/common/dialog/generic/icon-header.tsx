import * as React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classnames from '@lib/classnames';

import { DialogTypes, Types } from './types';

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
  [DialogTypes.DANGER]: 'bg-red-500',
  [DialogTypes.INFO]: 'bg-blue-500',
  [DialogTypes.SUCCESS]: 'bg-green-500',
  [DialogTypes.WARNING]: 'bg-yellow-500',
};

const icons = {
  [DialogTypes.DANGER]: 'times' as IconProp,
  [DialogTypes.INFO]: 'info' as IconProp,
  [DialogTypes.SUCCESS]: 'check' as IconProp,
  [DialogTypes.WARNING]: 'exclamation-triangle' as IconProp,
};

export const IconHeader: React.FC<IProps> = ({ type }) => (
  <div className={classnames(styles.common, styles[type])}>
    <FontAwesomeIcon className="text-white" icon={icons[type]} size="3x" fixedWidth />
  </div>
);
