import React from 'react';

import { Box, FlexProps, Flex } from '@chakra-ui/react';

import { es } from '@/i18n';
import { CategorySelectContainer } from '@/m/category';
import { CreditCardSelectContainer } from '@/m/creditCard';

import { useMovementStore } from '../../providers';


type IProps = FlexProps & {
  target?: HTMLElement | null;
};

const MovementExtraFilters: React.FC<IProps> = ({ target, ...flexProps }) => {
  const [state, dispatch] = useMovementStore();

  return (
    <Flex {...flexProps}>
      <Box maxW={['full', 'full', '96']} minW={['full', 'full', '96']}>
        <CategorySelectContainer
          menuPlacement="auto"
          menuPortalTarget={target}
          name="categorySelectedId"
          onChange={dispatch.onFilterByCategory}
          placeholder={es.movement.filters.categoryId}
          value={state.categoryId}
          isClearable
        />
      </Box>
      <Box maxW={['full', 'full', '96']} minW={['full', 'full', '96']}>
        <CreditCardSelectContainer
          menuPlacement="auto"
          menuPortalTarget={target}
          name="creditCardSelectedId"
          onChange={dispatch.onFilterByCreditCard}
          placeholder={es.movement.filters.creditCardId}
          value={state.creditCardId}
        />
      </Box>
    </Flex>
  );
};

export { MovementExtraFilters };
