import React from 'react';

import BankIcon from '@mui/icons-material/AccountBalance';
import CashIcon from '@mui/icons-material/LocalAtm';
import { SvgIconProps } from '@mui/material/SvgIcon';

import { AccountType } from '@/models';

type Props = SvgIconProps & {
  type: AccountType;
};

const AccountTypeIcon: React.FC<Props> = ({ type, ...iconProps }) => {
  switch (type) {
    case 'bank':
      return <BankIcon {...iconProps} />;
    case 'cash':
      return <CashIcon {...iconProps} />;
    default:
      return null;
  }
};

export default AccountTypeIcon;
