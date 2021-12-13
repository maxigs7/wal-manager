import React from 'react';

import { AccountType } from '@entities';
import { Icon, WalIconProps } from '@shared';

interface IProps extends Omit<WalIconProps, 'icon'> {
  type: AccountType;
}

const TypeIcon: React.FC<IProps> = ({ type, ...props }) => (
  <>
    {type === AccountType.Bank && <Icon {...props} icon="university" />}
    {type === AccountType.Wallet && <Icon {...props} icon="wallet" />}
  </>
);

export default TypeIcon;
