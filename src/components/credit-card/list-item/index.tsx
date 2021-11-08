import React from 'react';

import { Flex, Text, IconButton } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';
import { CardsListItem } from '@lib/wal-ui';
import { CreditCard } from '@models';

import { CreditCardTypeIcon } from '../type-icon';

const CreditCardListItem: React.FC<IProps> = ({ creditCard, onDelete, onSelected }) => {
  const onSelectedHandler = () => {
    onSelected && onSelected(creditCard);
  };
  const onDeleteHandler = () => {
    onDelete && onDelete(creditCard);
  };

  return (
    <CardsListItem>
      <Flex
        align="center"
        direction="column"
        h="full"
        justify="center"
        position="relative"
        w="full"
      >
        <CreditCardTypeIcon type={creditCard.type} width={100} />
        <Text textTransform="uppercase">{creditCard.name}</Text>
        <Flex mt={2}>
          <IconButton
            aria-label="Editar tarjeta"
            colorScheme="cello"
            icon={<Icon icon="edit" />}
            isRound={true}
            mr={1}
            onClick={onSelectedHandler}
            size="md"
          />
          <IconButton
            aria-label="Eliminar tarjeta"
            colorScheme="crimson"
            icon={<Icon icon="trash-alt" />}
            isRound={true}
            onClick={onDeleteHandler}
            size="md"
          />
        </Flex>
      </Flex>
    </CardsListItem>
  );
};

interface IProps {
  creditCard: CreditCard;
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
}

export { CreditCardListItem };
