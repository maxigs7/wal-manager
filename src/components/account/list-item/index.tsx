import React, { MouseEvent } from 'react';

import { Flex, Text, IconButton } from '@chakra-ui/react';

import { Account } from '@app/models/accounts';
import { Icon } from '@lib/chakra-ui';
import { Card } from '@lib/wal-ui';

import { AccountTypeIcon } from '../type-icon';

const active = {
  bg: 'crimson.500',
  color: 'white',
};

const AccountListItem: React.FC<IProps> = ({ account, isActive, onDelete, onSelected }) => {
  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete && onDelete(account);
  };

  return (
    <Card
      {...(isActive ? active : {})}
      _hover={{
        ...active,
        cursor: 'pointer',
      }}
      h={64}
      mb={5}
      mr={5}
      onClick={() => onSelected && onSelected(account)}
      p={5}
      role="group"
      w={64}
    >
      <Flex
        align="center"
        direction="column"
        h="full"
        justify="center"
        position="relative"
        w="full"
      >
        <AccountTypeIcon size="5x" type={account.accountType} />
        <Text textTransform="uppercase">{account.name}</Text>
        <IconButton
          _groupHover={{ bg: 'white', color: 'crimson.500' }}
          aria-label="Eliminar cuenta"
          colorScheme="crimson"
          icon={<Icon icon="trash-alt" />}
          isRound={true}
          onClick={onClickHandler}
          position="absolute"
          right={0}
          size="sm"
          top={0}
        />
      </Flex>
    </Card>
  );
};

interface IProps {
  account: Account;
  isActive: boolean;
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
}

export { AccountListItem };
