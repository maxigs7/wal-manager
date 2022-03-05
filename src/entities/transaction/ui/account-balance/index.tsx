import React from 'react';

import { StatGroup } from '@chakra-ui/react';

import { IAccountBalance } from '../../model/hooks/useAccountBalance';
import SummaryItem from '../summary-item';

interface IProps {
  balances: IAccountBalance[];
}

const Balance: React.FC<IProps> = ({ balances }) => (
  <>
    {balances.map((b) => (
      <StatGroup flexDirection="column" key="b.account" w="full">
        <SummaryItem amount={b.incomes} label="Ingresos" />
        <SummaryItem amount={b.incomes + b.expenses} label="Balance" useColors={true} />
      </StatGroup>
    ))}
  </>
);

export default React.memo(Balance);
