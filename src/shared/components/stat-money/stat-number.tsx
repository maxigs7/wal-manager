import React from 'react';

import { StatNumber, StatNumberProps } from '@chakra-ui/react';

import { formatToCurrency } from '@/lib';

interface IProps extends StatNumberProps {
  value: number;
}

const StatNumberFormatted: React.FC<IProps> = ({ value, ...statNumberProps }) => (
  <StatNumber {...statNumberProps}>$ {formatToCurrency(value || 0)}</StatNumber>
);

export { StatNumberFormatted };
