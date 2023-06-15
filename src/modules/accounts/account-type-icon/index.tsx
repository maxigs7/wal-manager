'use client';

import React, { useMemo } from 'react';

import { Icon, IconProps } from '@chakra-ui/react';

import { BankIcon, CashIcon } from '@/assets';
import { AccountType } from '@/models';

type Props = Omit<IconProps, 'as'> & {
  type: AccountType;
};

const AccountTypeIcon: React.FC<Props> = ({ type, ...props }) => {
  const icon = useMemo(() => {
    switch (type) {
      case 'bank':
        return BankIcon;
      case 'cash':
        return CashIcon;
      default:
        return null;
    }
  }, [type]);
  return (
    <>
      <Icon {...props} as={icon} />
    </>
  );
};

export { AccountTypeIcon };
