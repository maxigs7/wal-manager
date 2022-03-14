import React from 'react';

import { StatGroup } from '@chakra-ui/react';

import { ICreditCardSummary } from '../../hooks/useCreditCardSummary';
import SummaryItem from '../summary-item';

interface IProps {
  creditCards: ICreditCardSummary[];
}

const Summary: React.FC<IProps> = ({ creditCards }) => (
  <StatGroup flexDirection="column" w="full">
    {creditCards.map((s) => (
      <SummaryItem amount={s.amount} key={s.cc} label={s.cc} />
    ))}
  </StatGroup>
);

export default React.memo(Summary);
