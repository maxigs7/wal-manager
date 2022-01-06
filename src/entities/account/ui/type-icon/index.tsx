import React, { useMemo } from 'react';

import { IconName } from '@fortawesome/fontawesome-svg-core';

import { AccountType } from '@entities';
import { Icon, WalIconProps } from '@shared';

interface IProps extends Omit<WalIconProps, 'icon'> {
  type: AccountType;
}

const TypeIcon: React.FC<IProps> = ({ type, ...props }) => {
  const icon: IconName = useMemo(() => {
    switch (type) {
      case 'bank':
        return 'university';
      case 'wallet':
        return 'wallet';
      default:
        return 'university';
    }
  }, [type]);
  return (
    <>
      <Icon {...props} icon={icon} />
    </>
  );
};

export default TypeIcon;
