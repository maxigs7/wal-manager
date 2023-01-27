import React, { useMemo } from 'react';

import {
  StatArrow,
  StatHelpText as ChakraStatHelpText,
  StatHelpTextProps,
  useColorModeValue,
} from '@chakra-ui/react';

import { formatToCurrency } from '@lib';

interface IProps extends Omit<StatHelpTextProps, 'prefix'> {
  inverted?: boolean;
  prefix?: boolean;
  symbol?: string;
  value: number;
}

const StatHelpText: React.FC<IProps> = ({
  inverted = false,
  prefix = false,
  symbol = '%',
  value,
  ...helpTextProps
}) => {
  const colorRed = useColorModeValue('red.600', 'red.200');
  const colorGreen = useColorModeValue('green.600', 'green.200');
  const color = useMemo(
    () => (inverted && value > 0 ? colorRed : colorGreen),
    [colorGreen, colorRed, inverted, value],
  );
  const type = useMemo(() => (inverted && value > 0 ? 'increase' : 'decrease'), [inverted, value]);
  return (
    <ChakraStatHelpText {...helpTextProps}>
      <StatArrow color={color} type={type} />
      {prefix && symbol} {formatToCurrency(Math.abs(value))} {!prefix && symbol}
    </ChakraStatHelpText>
  );
};

export { StatHelpText };
