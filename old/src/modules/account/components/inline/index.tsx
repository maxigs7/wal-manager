import { Text, TextProps } from '@chakra-ui/react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { AccountType, Currency, getCurrencyName } from '@models';

import AccountTypeIcon from '../type-icon';

interface IProps extends TextProps {
  currency: Currency;
  iconSize?: SizeProp;
  name: string;
  type: AccountType;
}

const Inline: React.FC<IProps> = ({ currency, iconSize, name, type, ...textProps }) => {
  return (
    <>
      <AccountTypeIcon fixedWidth={true} size={iconSize} type={type} />
      <Text {...textProps}>
        {name}{' '}
        <Text as="strong" fontWeight="bold">
          ({getCurrencyName(currency)})
        </Text>
      </Text>
    </>
  );
};

export default Inline;
