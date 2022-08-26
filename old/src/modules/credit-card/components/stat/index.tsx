import React from 'react';

import { Box, BoxProps, Text } from '@chakra-ui/react';

import { formatToCurrency } from '@lib';
import { CreditCardType } from '@models';
import { Card } from '@shared';

import { CreditCardTypeIcon } from '..';

interface IProps extends BoxProps {
  amount: number;
  iconProps?: Omit<React.SVGProps<SVGSVGElement>, 'type'>;
  label?: string;
  type: CreditCardType;
}

const StatMoney: React.FC<IProps> = ({
  amount,
  type,
  iconProps: { width: iconWidth = 50, ...iconProps } = {},
  label,
  ...boxProps
}) => {
  return (
    <Card display="inline-flex" justifyContent="center" px="4" py="2" {...boxProps}>
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
    </Card>
  );
};

export default StatMoney;
