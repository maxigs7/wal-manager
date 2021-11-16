import { Text, TextProps } from '@chakra-ui/react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { AccountTypeIcon } from '@components';
import { AccountType } from '@models';

const AccountInline: React.FC<IProps> = ({ iconSize, name, type, ...textProps }) => {
  return (
    <>
      <AccountTypeIcon fixedWidth={true} size={iconSize} type={type} />
      <Text {...textProps}>{name}</Text>
    </>
  );
};

interface IProps extends TextProps {
  iconSize?: SizeProp;
  name: string;
  type: AccountType;
}

export { AccountInline };
