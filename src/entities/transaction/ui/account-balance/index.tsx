import React from 'react';

import { Flex } from '@chakra-ui/react';

import { IAccountBalance } from '../../model/hooks/useAccountBalance';
import SummaryItem from '../summary-item';

interface IProps {
  balances: IAccountBalance[];
}

const Balance: React.FC<IProps> = ({ balances }) => (
  <>
    {balances.map((b) => (
      <Flex
        align={['flex-start', 'center']}
        direction={['column', 'row']}
        justify="space-around"
        key={b.account}
        p={3}
      >
        <SummaryItem amount={b.incomes} label={b.account} />
        <SummaryItem amount={b.incomes + b.expenses} label="Balance" />
      </Flex>
    ))}
  </>
);

export default Balance;
