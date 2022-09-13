import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

import { formatToCurrency } from '@lib';
import { CreditCardType } from '@models';

import { CreditCardTypeIcon } from '..';

interface IProps extends BoxProps {
  amount: number;
  iconProps?: Omit<React.SVGProps<SVGSVGElement>, 'type'>;
  label?: string;
  type: CreditCardType;
}

const CreditCardStat: React.FC<IProps> = ({
  amount,
  type,
  iconProps: { width: iconWidth = 50, ...iconProps } = {},
  label,
  ...boxProps
}) => {
  return (
    <Box
      borderRight="1px"
      borderRightColor="gray.300"
      display="inline-flex"
      flexBasis="100%"
      justifyContent="center"
      maxW="xs"
      minW={['xs', 'xs', null]}
      my="2"
      px="4"
      py="2"
      {...boxProps}
    >
      <Box mr="auto">
        {label && (
          <Text color="gray.400" fontSize="md" textTransform="uppercase">
            {label}
          </Text>
        )}
        <Text fontSize="xl" fontWeight="bold" textOverflow="ellipsis" whiteSpace="nowrap">
          $ {formatToCurrency(amount)}
        </Text>
      </Box>
      <CreditCardTypeIcon type={type} width={iconWidth} {...iconProps} />
    </Box>
  );
};

export { CreditCardStat };
