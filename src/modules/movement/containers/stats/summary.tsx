import { StatGroup } from '@chakra-ui/react';

import { BalanceStat } from './balance-stat';
import { ExpensesStat } from './expenses-stat';
import { IncomesStat } from './incomes-stat';
import { InvestmentStat } from './investment-stat';
import { PriorStat } from './prior-stat';

const SummaryStats: React.FC = () => (
  <StatGroup bg="white" flexWrap="nowrap" justifyContent="flex-start" overflowX="auto">
    <PriorStat />
    <IncomesStat />
    <ExpensesStat />
    <InvestmentStat />
    <BalanceStat />
  </StatGroup>
);

export { SummaryStats };
