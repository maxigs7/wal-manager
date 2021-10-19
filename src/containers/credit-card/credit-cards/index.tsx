import React, { useEffect } from 'react';

import { CircularProgress, Flex } from '@chakra-ui/react';

import { CreditCardList, CreditCardNewPlaceholder } from '@app/components';
import { CreditCard } from '@app/models/credit-cards';

import { useRedux } from './useRedux';

const CreditCardsList: React.FC<IProps> = ({ onCreate, onDelete }) => {
  const { state, dispatch } = useRedux();

  useEffect(() => {
    dispatch.onCreditCardsRequest();
  }, []);

  console.log('CreditCardsPage rendering...');

  return (
    <>
      {state.isLoading && (
        <Flex align="center" justify="center" p={5}>
          <CircularProgress color="crimson.300" isIndeterminate />
        </Flex>
      )}
      {!state.isLoading && (
        <CreditCardList
          creditCards={state.creditCards}
          onDelete={onDelete}
          onSelected={dispatch.onCreditCardSelected}
          selected={state.selected}
        >
          <CreditCardNewPlaceholder onSelected={onCreate} />
        </CreditCardList>
      )}
    </>
  );
};

interface IProps {
  onCreate?(): void;
  onDelete?(creditCard: CreditCard): void;
}

export { CreditCardsList };
