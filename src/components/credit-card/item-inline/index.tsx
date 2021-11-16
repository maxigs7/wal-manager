import { Text, TextProps } from '@chakra-ui/react';

import { CreditCardTypeIcon } from '@components';
import { CreditCardType } from '@models';

const CreditCardInline: React.FC<IProps> = ({ iconWidth = 100, name, type, ...textProps }) => {
  return (
    <>
      <CreditCardTypeIcon type={type} width={iconWidth} />
      <Text {...textProps}>{name}</Text>
    </>
  );
};

interface IProps extends TextProps {
  iconWidth?: number;
  name: string;
  type: CreditCardType;
}

export { CreditCardInline };
