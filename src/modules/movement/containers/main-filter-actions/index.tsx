import React, { useCallback, useRef } from 'react';

import { Box, Collapse, Flex, IconButton, FlexProps, useDisclosure } from '@chakra-ui/react';

import { es } from '@/i18n';
import { AccountSelectContainer } from '@/m/account';
import { Account } from '@/models';
import { Icon, MonthYear } from '@/shared';

import { useMovementStore } from '../../providers';
import { MovementExtraFilters } from '../extra-filters';


interface IProps extends FlexProps {}

const MovementMainFilterActions: React.FC<IProps> = ({ ...flexProps }) => {
  const [state, dispatch] = useMovementStore();
  const { isOpen, onToggle } = useDisclosure();
  const ref = useRef<HTMLDivElement>(null);

  const onChangeAccountHandler = useCallback(
    (account?: Account) => {
      dispatch.onChangedAccount(account);
    },
    [dispatch],
  );

  const onChangeMonthYearHandler = useCallback(
    (month: number, year: number) => {
      dispatch.onChangedMonthYear(month, year);
    },
    [dispatch],
  );

  return (
    <>
      <Flex bg="white" direction={{ base: 'column', md: 'row' }} gap="2" {...flexProps} ref={ref}>
        <Box minW={['full', 'full', '96']}>
          <AccountSelectContainer
            name="accountSelectedId"
            onChange={onChangeAccountHandler}
            placeholder={es.movement.filters.accountId}
            value={state.accountId}
          />
        </Box>
        <Flex w="full">
          <MonthYear
            display={['flex', 'flex', 'inline-flex']}
            month={state.month}
            onChange={onChangeMonthYearHandler}
            w={['full', 'full', 'auto']}
            year={state.year}
          />
          <IconButton
            aria-label="expand filters"
            icon={<Icon icon={isOpen ? 'angle-double-up' : 'filter'} />}
            ml={['2', '2', 'auto']}
            onClick={() => onToggle()}
            variant="ghost"
          />
        </Flex>
      </Flex>
      <Collapse in={isOpen}>
        <MovementExtraFilters
          bg="white"
          direction={{ base: 'column', md: 'row' }}
          gap="2"
          p="3"
          target={ref.current}
        />
      </Collapse>
    </>
  );
};

export { MovementMainFilterActions };
