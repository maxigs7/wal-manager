import React, { useCallback } from 'react';

import { Box, Button, Stack, StackProps, Text } from '@chakra-ui/react';

import { useDolarsi } from '@api';
import { formatToCurrency } from '@lib';
import { AccountSelectContainer } from '@m/account';
import { CreateTransactionButtonContainer, useTransactionStore } from '@m/transaction';
import { Account, TransactionType } from '@models';

interface IProps extends StackProps {
  goCreate(type: TransactionType, date: Date): void;
}

const MainFilterActions: React.FC<IProps> = ({ goCreate, ...stackProps }) => {
  const [state, dispatch] = useTransactionStore();
  const dolarsi = useDolarsi();

  const onChangeAccountHandler = useCallback(
    (_id: string, account?: Account) => {
      dispatch.onChangedAccount(account);
      if (account?.currency !== 'usd') {
        dispatch.onChangedQuotation(undefined);
      }
    },
    [dispatch],
  );

  const onDolarsiClick = () => {
    if (!state.quotation) {
      dispatch.onChangedQuotation(dolarsi[0]);
      return;
    }

    const currentIndex = dolarsi.findIndex((d) => d.name === state.quotation?.name);
    const nextIndex = currentIndex === dolarsi.length - 1 ? undefined : currentIndex + 1;
    dispatch.onChangedQuotation(nextIndex ? dolarsi[nextIndex] : undefined);
  };

  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap="2" {...stackProps}>
      <Box minW={['full', 'full', '96']}>
        <AccountSelectContainer
          name="accountSelectedId"
          onChange={onChangeAccountHandler}
          placeholder="Seleccione una cuenta"
          value={state.account?.id}
        />
      </Box>
      <CreateTransactionButtonContainer
        goCreate={goCreate}
        icon="plus"
        label="Nuevo gasto"
        type="expenses"
      />
      <CreateTransactionButtonContainer
        goCreate={goCreate}
        icon="plus"
        label="Nuevo ingreso"
        type="incomes"
      />
      {state.account?.currency === 'usd' && (
        <Button onClick={onDolarsiClick}>
          {state.quotation?.name || 'Cambiar Cotizacion'}
          {state.quotation && (
            <Text as="strong" ml="1">
              ({formatToCurrency(state.quotation.price)})
            </Text>
          )}
        </Button>
      )}
    </Stack>
  );
};

export default MainFilterActions;
