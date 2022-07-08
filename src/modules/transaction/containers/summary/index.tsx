import React from 'react';

import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

import { ContentLoader, StatMoney } from '@shared';

import { useAccountBalance, useCreditCardSummary } from '../../hooks';
import { useTransactionStore } from '../../providers';

const Summary: React.FC<SimpleGridProps> = ({ ...simpleGridProps }) => {
  const [{ accountId, startDate, endDate }, { onHighlightType }] = useTransactionStore();
  const { data: balances, isLoading: isLoadingBalance } = useAccountBalance(
    accountId,
    startDate,
    endDate,
  );
  const { data: creditCards, isLoading: isLoadingCreditCards } = useCreditCardSummary(
    accountId,
    startDate,
    endDate,
  );

  if (!accountId) {
    return null;
  }
  if (isLoadingBalance || isLoadingCreditCards) return <ContentLoader />;
  if (!balances) {
    return null;
  }

  return (
    <SimpleGrid columns={[1, null, 2, 4]} gap={3} {...simpleGridProps}>
      <StatMoney
        amount={balances.current}
        icon="bank"
        iconProps={{ bg: 'orange.600' }}
        label="Anterior"
        useColors={true}
      />
      <StatMoney
        amount={balances.incomes}
        icon="sack-dollar"
        iconProps={{ bg: 'green.600' }}
        label="Ingresos"
        onMouseEnter={() => onHighlightType('incomes')}
        onMouseLeave={() => onHighlightType()}
        onTouchEnd={() => onHighlightType()}
        onTouchStart={() => onHighlightType('incomes')}
      />
      <StatMoney
        amount={balances.expenses}
        icon="sack-xmark"
        iconProps={{ bg: 'red.600' }}
        label="Gastos"
        onMouseEnter={() => onHighlightType('expenses')}
        onMouseLeave={() => onHighlightType()}
        onTouchEnd={() => onHighlightType()}
        onTouchStart={() => onHighlightType('expenses')}
      />
      <StatMoney
        amount={balances.balance}
        icon="balance-scale"
        iconProps={{ bg: 'blue.600' }}
        label="Balance"
        useColors={true}
      />

      {/* <Card alignItems={isLoadingBalance ? 'center' : 'flex-start'} as={VStack} p="5" w="full">
        {isLoadingCreditCards && <ContentLoader />}
        {!isLoadingCreditCards && <CreditCardSummary creditCards={creditCards || []} />}
      </Card> */}
    </SimpleGrid>
  );
};

export default React.memo(Summary);
