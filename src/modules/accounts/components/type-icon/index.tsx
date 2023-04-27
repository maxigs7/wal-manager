import React, { useMemo } from 'react';

import { Icon, IconProps } from '@chakra-ui/react';
import { BanknotesIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

import { AccountType } from '@/models';

interface IProps extends Omit<IconProps, 'as'> {
  type: AccountType;
}

const AccountTypeIcon: React.FC<IProps> = ({ type, ...props }) => {
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
