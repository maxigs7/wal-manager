import React from 'react';

import { BoxProps, Button, Flex, useBreakpointValue } from '@chakra-ui/react';

import { CreditCard } from '@models';
import { Card, Icon } from '@shared';

import Inline from '../inline';

interface IProps extends BoxProps {
  creditCard: CreditCard;
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
}

const ListItem: React.FC<IProps> = ({ creditCard, onDelete, onSelected, ...cardProps }) => {
  const size = useBreakpointValue({ base: 'md', md: 'sm' });
  const onSelectedHandler = () => {
    onSelected && onSelected(creditCard);
  };
  const onDeleteHandler = () => {
    onDelete && onDelete(creditCard);
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
        <Inline name={creditCard.name} textTransform="uppercase" type={creditCard.type} />
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
