import React from 'react';

import {
  Box,
  BoxProps,
  Collapse,
  Flex,
  IconButton,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';

import { CategorySelectContainer } from '@m/category';
import { CreditCardSelectContainer } from '@m/credit-card';
import { useTransactionStore } from '@m/transaction';
import { Icon } from '@shared';

import MonthYearSelector from '../month-year-selector';

type IProps = BoxProps;

const ExtraFilters: React.FC<IProps> = ({ ...boxProps }) => {
  const [state, dispatch] = useTransactionStore();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box mb="3" {...boxProps}>
      <Flex flexDirection="row" mb={isOpen ? '3' : '0'}>
        <IconButton
          aria-label="expand filters"
          icon={<Icon icon={isOpen ? 'angle-double-up' : 'angle-double-down'} />}
          mr="3"
          onClick={() => onToggle()}
        />
        <MonthYearSelector display={['flex', 'flex', 'inline-flex']} w={['full', 'full', 'auto']} />
      </Flex>
      <Collapse in={isOpen}>
        <SimpleGrid columns={[1, 1, 2, 4]} gap="3">
          <CategorySelectContainer
            name="categorySelectedId"
            onChange={dispatch.onFilterByCategory}
            placeholder="Seleccione una categoria"
            value={state.categoryId}
            isClearable
          />
          <CreditCardSelectContainer
            name="creditCardSelectedId"
            onChange={dispatch.onFilterByCreditCard}
            placeholder="Seleccione una tarjeta"
            value={state.creditCardId}
          />
        </SimpleGrid>
      </Collapse>
    </Box>
  );
};

export default ExtraFilters;
