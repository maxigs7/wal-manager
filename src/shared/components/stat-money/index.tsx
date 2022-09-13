import { Box, BoxProps, Text } from '@chakra-ui/react';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import React, { useMemo } from 'react';

import { formatToCurrency } from '@lib';

import { Icon, WalIconProps } from '../icon';

interface IProps extends BoxProps {
  amount: number;
  icon: IconName;
  iconProps?: Omit<WalIconProps, 'icon'>;
  label?: string;
  useColors?: boolean;
}

const StatMoney: React.FC<IProps> = ({
  amount,
  icon,
  iconProps: { color: iconColor = 'white', bg: iconBg = 'primary.800', ...iconProps } = {},
  label,
  useColors = false,
  ...boxProps
}) => {
  const color = useMemo(
    () => (useColors ? (!amount ? undefined : amount > 0 ? 'green.500' : 'red.500') : ''),
    [amount, useColors],
  );

  return (
    <Box
      alignContent="center"
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
      <Box>
        {label && (
          <Text color="gray.400" fontSize="md" textTransform="uppercase">
            {label}
          </Text>
        )}
        <Text
          color={color}
          fontSize="xl"
          fontWeight="bold"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          $ {formatToCurrency(amount)}
        </Text>
      </Box>
      {icon && (
        <Icon
          bg={iconBg}
          borderRadius="sm"
          color={iconColor}
          icon={icon}
          ml="auto"
          p="2"
          size="2x"
          fixedWidth
          {...iconProps}
        />
      )}
    </Box>
  );
};

export { StatMoney };
