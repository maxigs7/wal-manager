'use client';

import React, { useMemo } from 'react';

import { Icon, IconProps } from '@chakra-ui/react';

import { BanknotesIcon, BuildingLibraryIcon } from '@/lib/heroicons';
import { AccountType } from '@/models';

type Props = Omit<IconProps, 'as'> & {
  type: AccountType;
};

const AccountTypeIcon: React.FC<Props> = ({ type, ...props }) => {
  const icon = useMemo(() => {
    switch (type) {
      case 'bank':
        return BuildingLibraryIcon;
      case 'cash':
        return BanknotesIcon;
      default:
        return BuildingLibraryIcon;
    }
  }, [type]);
  return (
    <>
      <Icon {...props} as={icon} />
    </>
  );
};

export { AccountTypeIcon };
