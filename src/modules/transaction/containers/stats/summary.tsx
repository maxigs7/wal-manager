import { Flex } from '@chakra-ui/react';

import { BalanceStat, ExpensesStat, IncomesStat, PriorStat } from '@m/transaction';

const SummaryStats: React.FC = () => (
  <Flex bg="white" overflowX="auto">
    <PriorStat />
    <ExpensesStat />
    <IncomesStat />
    <BalanceStat />
  </Flex>
);

export { SummaryStats };
