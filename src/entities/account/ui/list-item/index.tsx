import React from 'react';

import { Flex, IconButton } from '@chakra-ui/react';

import { Account } from '@entities';
import { CardItem, Icon } from '@shared';

import Inline from '../inline';

interface IProps {
  account: Account;
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
}

const ListItem: React.FC<IProps> = ({ account, onDelete, onSelected }) => {
  const onSelectedHandler = () => {
    onSelected && onSelected(account);
  };
  const onDeleteHandler = () => {
    onDelete && onDelete(account);
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
        <Inline iconSize="5x" name={account.name} textTransform="uppercase" type={account.type} />
        <Flex mt={2}>
          <IconButton
            aria-label="Editar cuenta"
            colorScheme="primary"
            icon={<Icon icon="edit" />}
            isRound={true}
            mr={1}
            onClick={onSelectedHandler}
            size="md"
          />
          <IconButton
            aria-label="Eliminar cuenta"
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
