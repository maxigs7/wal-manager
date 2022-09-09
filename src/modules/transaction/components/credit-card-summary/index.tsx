import { StatGroup } from '@chakra-ui/react';
import React from 'react';

import { ICreditCardSummary } from '../../hooks/useCreditCardSummary';
import { CreditCardSummaryItem } from '../summary-item';

interface IProps {
  creditCards: ICreditCardSummary[];
}

const CreditCardSummary: React.FC<IProps> = React.memo(({ creditCards }) => (
  <StatGroup flexDirection="column" w="full">
    {creditCards.map((s) => (
      <CreditCardSummaryItem key={s.cc} amount={s.amount} label={s.cc} />
    ))}
  </StatGroup>
));

CreditCardSummary.displayName = 'CreditCardSummary';
export { CreditCardSummary };
