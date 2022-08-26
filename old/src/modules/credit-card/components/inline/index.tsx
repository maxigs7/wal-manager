import { Text, TextProps } from '@chakra-ui/react';

import { CreditCardType } from '@models';

import CreditCardTypeIcon from '../type-icon';

interface IProps extends TextProps {
  iconWidth?: number;
  name: string;
  type: CreditCardType;
}

const Inline: React.FC<IProps> = ({ iconWidth = 100, name, type, ...textProps }) => {
  return (
    <>
      <CreditCardTypeIcon type={type} width={iconWidth} />
      <Text {...textProps}>{name}</Text>
    </>
  );
};

export default Inline;
