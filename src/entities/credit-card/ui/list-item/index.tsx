import React from 'react';

import { Flex, IconButton } from '@chakra-ui/react';

import { CreditCard } from '@entities';
import { CardItem, Icon } from '@shared';

import Inline from '../inline';

interface IProps {
  creditCard: CreditCard;
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
}

const ListItem: React.FC<IProps> = ({ creditCard, onDelete, onSelected }) => {
  const onSelectedHandler = () => {
    onSelected && onSelected(creditCard);
  };
  const onDeleteHandler = () => {
    onDelete && onDelete(creditCard);
  };

  return (
    <CardItem mr={[0, 5]} w={['full', 64]}>
      <Flex
        align="center"
        direction="column"
        h="full"
        justify="center"
        position="relative"
        w="full"
      >
        <Inline name={creditCard.name} textTransform="uppercase" type={creditCard.type} />
        <Flex mt={2}>
          <IconButton
            aria-label="Editar tarjeta"
            colorScheme="primary"
            icon={<Icon icon="edit" />}
            isRound={true}
            mr={1}
            onClick={onSelectedHandler}
            size="md"
          />
          <IconButton
            aria-label="Eliminar tarjeta"
            colorScheme="danger"
            icon={<Icon icon="trash-alt" />}
            isRound={true}
            onClick={onDeleteHandler}
            size="md"
          />
        </Flex>
      </Flex>
    </CardItem>
  );
};

export default ListItem;
