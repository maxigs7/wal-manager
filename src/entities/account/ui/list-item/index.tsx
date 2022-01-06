import React from 'react';

import { BoxProps, Flex, Button, useBreakpointValue } from '@chakra-ui/react';

import { Account } from '@entities';
import { Card, Icon } from '@shared';

import Inline from '../inline';

interface IProps extends BoxProps {
  account: Account;
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
}

const ListItem: React.FC<IProps> = ({ account, onDelete, onSelected, ...cardProps }) => {
  const size = useBreakpointValue({ base: 'md', md: 'sm' });
  const onSelectedHandler = () => {
    onSelected && onSelected(account);
  };
  const onDeleteHandler = () => {
    onDelete && onDelete(account);
  };

  return (
    <Card
      {...cardProps}
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Flex align="center" direction="column" flex="1" justify="center">
        <Inline iconSize="5x" name={account.name} textTransform="uppercase" type={account.type} />
      </Flex>
      <Flex borderTop="1px solid" borderTopColor="gray.200" mt="auto" w="full">
        <Button
          colorScheme="gray"
          flex={1}
          leftIcon={<Icon icon="edit" />}
          onClick={onSelectedHandler}
          rounded="none"
          size={size}
          variant="ghost"
        >
          Modificar
        </Button>
        <Button
          colorScheme="danger"
          flex={1}
          leftIcon={<Icon icon="trash-alt" />}
          onClick={onDeleteHandler}
          rounded="none"
          size={size}
        >
          Eliminar
        </Button>
      </Flex>
    </Card>
  );
};

export default ListItem;
