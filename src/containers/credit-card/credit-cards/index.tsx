import React, { useEffect } from 'react';

import { CircularProgress, Flex } from '@chakra-ui/react';

import { useCreditCardList } from '@api';
import { CreditCardList, CreditCardNewPlaceholder } from '@components';
import { CreditCard } from '@models';

const CreditCardsList: React.FC<IProps> = ({ onCreate, onDelete, onSelected }) => {
  const { data: creditCards, isLoading, refetch } = useCreditCardList();

  useEffect(() => {
    refetch();
  }, []);

  console.log('CreditCardsList rendering...');

  return (
    <>
      {isLoading && (
        <Flex align="center" justify="center" p={5}>
          <CircularProgress color="crimson.300" isIndeterminate />
        </Flex>
      )}
      {!isLoading && (
        <CreditCardList creditCards={creditCards || []} onDelete={onDelete} onSelected={onSelected}>
          <CreditCardNewPlaceholder onSelected={onCreate} />
        </CreditCardList>
      )}
    </>
  );
};

interface IProps {
  onCreate?(): void;
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
}

export { CreditCardsList };
