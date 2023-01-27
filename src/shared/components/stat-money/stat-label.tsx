import React, { useMemo } from 'react';

import {
  Box,
  BoxProps,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel as ChakraStatLabel,
  StatLabelProps,
  StatNumber,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import { formatToCurrency } from '@/lib';

import { Icon, WalIconProps } from '../icon';


interface IProps extends StatLabelProps {
  amount: number;
  iconProps?: Omit<WalIconProps, 'icon'>;
  useColors?: boolean;
}

const StatLabel: React.FC<StatLabelProps> = ({ children, ...props }) => (
  <ChakraStatLabel color="gray.400" textTransform="uppercase" {...props}>
    {children}
  </ChakraStatLabel>
);

export { StatLabel };
