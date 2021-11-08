import React from 'react';

import { Icon, WalIconProps } from '@lib/chakra-ui';
import { AccountType } from '@models';

const AccountTypeIcon: React.FC<IProps> = ({ type, ...props }) => (
  <>
    {type === AccountType.Bank && <Icon {...props} icon="university" />}
    {type === AccountType.Wallet && <Icon {...props} icon="wallet" />}
  </>
);

interface IProps extends Omit<WalIconProps, 'icon'> {
  type: AccountType;
}

export { AccountTypeIcon };
