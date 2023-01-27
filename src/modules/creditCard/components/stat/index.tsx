import React from 'react';

import { Box, BoxProps, IconProps, Stat, Text, useColorModeValue } from '@chakra-ui/react';


import { formatToCurrency } from '@/lib';
import { CreditCardType } from '@/models';
import { StatLabel, StatNumberFormatted } from '@/shared';

import { CreditCardTypeIcon } from '..';

interface IProps extends BoxProps {
  amount: number;
  label?: string;
  size?: number;
  type: CreditCardType;
}

const CreditCardStat: React.FC<IProps> = ({ amount, type, label, ...boxProps }) => {
  const bgIcon = useColorModeValue('primary.200', 'primary.500');
  const colorIcon = useColorModeValue('primary.500', 'primary.200');
  return (
    <Box
      alignContent="center"
      display="inline-flex"
      flexBasis="100%"
      justifyContent="center"
      maxW="xs"
      minW={['xs', 'xs', null]}
      px="4"
      py="2"
      {...boxProps}
    >
      <CreditCardTypeIcon
        bg={bgIcon}
        boxSize="14"
        color={colorIcon}
        mr="3"
        p="3"
        rounded="full"
        type={type}
      />
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumberFormatted value={amount} />
      </Stat>
    </Box>
  );
};

export { CreditCardStat };
