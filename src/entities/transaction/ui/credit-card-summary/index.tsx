import React from 'react';

import { ICreditCardSummary } from '../../model/hooks/useCreditCardSummary';
import SummaryItem from '../summary-item';

interface IProps {
  creditCards: ICreditCardSummary[];
}

const Summary: React.FC<IProps> = ({ creditCards }) => (
  <>
    {creditCards.map((s) => (
      <SummaryItem amount={s.amount} key={s.cc} label={s.cc} />
    ))}
  </>
);

export default Summary;
