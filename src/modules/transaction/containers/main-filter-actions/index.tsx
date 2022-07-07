import React from 'react';

import { Box, Stack, StackProps } from '@chakra-ui/react';

import { AccountSelectContainer } from '@m/account';
import { CreateTransactionButtonContainer, useTransactionStore } from '@m/transaction';
import { TransactionType } from '@models';

interface IProps extends StackProps {
  goCreate(type: TransactionType, date: Date): void;
}

const MainFilterActions: React.FC<IProps> = ({ goCreate, ...stackProps }) => {
  const [state, dispatch] = useTransactionStore();

  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap="2" {...stackProps}>
      <Box minW={['full', 'full', '96']}>
        <AccountSelectContainer
          name="accountSelectedId"
          onChange={dispatch.onChangedAccount}
          placeholder="Seleccione una cuenta"
          value={state.accountId}
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
    </Stack>
  );
};

export default MainFilterActions;
