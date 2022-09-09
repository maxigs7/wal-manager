import { Box, FlexProps, Flex } from '@chakra-ui/react';
import React from 'react';

import { es } from '@i18n';
import { CategorySelectContainer } from '@m/category';
import { CreditCardSelectContainer } from '@m/creditCard';
import { useTransactionStore } from '@m/transaction';

type IProps = FlexProps & {
  target?: HTMLElement | null;
};

const TransactionExtraFilters: React.FC<IProps> = ({ target, ...flexProps }) => {
  const [state, dispatch] = useTransactionStore();

  return (
    <Flex {...flexProps}>
      <Box maxW={['full', 'full', '96']} minW={['full', 'full', '96']}>
        <CategorySelectContainer
          menuPlacement="auto"
          menuPortalTarget={target}
          name="categorySelectedId"
          onChange={dispatch.onFilterByCategory}
          placeholder={es.transaction.filters.categoryId}
          value={state.categoryId}
          isClearable
        />
      </Box>
      <Box maxW={['full', 'full', '96']} minW={['full', 'full', '96']}>
        <CreditCardSelectContainer
          menuPlacement="auto"
          menuPortalTarget={target}
          name="creditCardSelectedId"
          onChange={dispatch.onFilterByCreditCard}
          placeholder={es.transaction.filters.creditCardId}
          value={state.creditCardId}
        />
      </Box>
    </Flex>
  );
};

export { TransactionExtraFilters };
