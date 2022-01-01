import React from 'react';

import { Text, Flex } from '@chakra-ui/react';

import { formatToCurrency } from '@shared';

import { IAccountBalance } from '../../model/hooks/useAccountBalance';

interface IProps {
  balances: IAccountBalance[];
}

const Balance: React.FC<IProps> = ({ balances }) => (
  <>
    {balances.map((b) => (
      <Flex align="center" justify="space-around" key={b.account} p={3}>
        <Text>
          <Text as="strong">{b.account}:</Text> $ {formatToCurrency(b.incomes)}
        </Text>
        <Text>
          <Text as="strong">Balance:</Text> $ {formatToCurrency(b.incomes + b.expenses)}
        </Text>
      </Flex>
    ))}
  </>
);

export default Balance;
