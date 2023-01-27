import { Text, TextProps } from '@chakra-ui/react';

import { CreditCardType } from '@models';

import { CreditCardTypeIcon } from '../type-icon';

interface IProps extends TextProps {
  iconSize?: number;
  name: string;
  type: CreditCardType;
}

const CreditCardInline: React.FC<IProps> = ({ iconSize, name, type, ...textProps }) => {
  return (
    <>
      <CreditCardTypeIcon boxSize={iconSize} type={type} />
      <Text {...textProps}>{name}</Text>
    </>
  );
};

export { CreditCardInline };
