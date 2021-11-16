import React from 'react';

import { Flex, IconButton } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';
import { CardsListItem } from '@lib/wal-ui';
import { Account } from '@models';

import { AccountInline } from '../item-inline';

const AccountListItem: React.FC<IProps> = ({ account, onDelete, onSelected }) => {
  const onSelectedHandler = () => {
    onSelected && onSelected(account);
  };
  const onDeleteHandler = () => {
    onDelete && onDelete(account);
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
        <AccountInline
          iconSize="5x"
          name={account.name}
          textTransform="uppercase"
          type={account.type}
        />
        <Flex mt={2}>
          <IconButton
            aria-label="Editar cuenta"
            colorScheme="cello"
            icon={<Icon icon="edit" />}
            isRound={true}
            mr={1}
            onClick={onSelectedHandler}
            size="md"
          />
          <IconButton
            aria-label="Eliminar cuenta"
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
  account: Account;
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
}

export { AccountListItem };
