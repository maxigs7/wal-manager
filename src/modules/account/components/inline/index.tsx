import { Text, TextProps } from '@chakra-ui/react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { AccountType } from '@models';

import AccountTypeIcon from '../type-icon';

interface IProps extends TextProps {
  iconSize?: SizeProp;
  name: string;
  type: AccountType;
}

const Inline: React.FC<IProps> = ({ iconSize, name, type, ...textProps }) => {
  return (
    <>
      <AccountTypeIcon fixedWidth={true} size={iconSize} type={type} />
      <Text {...textProps}>{name}</Text>
    </>
  );
};

export default Inline;
