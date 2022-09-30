import { Box, Collapse, Flex, IconButton, FlexProps, useDisclosure } from '@chakra-ui/react';
import React, { useCallback, useRef } from 'react';

import { es } from '@i18n';
import { AccountSelectContainer } from '@m/account';
import { Account } from '@models';
import { Icon } from '@shared';

import { useTransactionStore } from '../../providers';
import { TransactionExtraFilters } from '../extra-filters';
import { MonthYearSelector } from '../month-year-selector';

interface IProps extends FlexProps {}

const TransactionMainFilterActions: React.FC<IProps> = ({ ...flexProps }) => {
  const [state, dispatch] = useTransactionStore();
  const { isOpen, onToggle } = useDisclosure();
  const ref = useRef<HTMLDivElement>(null);

  const onChangeAccountHandler = useCallback(
    (_id: string, account?: Account) => {
      dispatch.onChangedAccount(account);
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
            placeholder={es.transaction.filters.accountId}
            value={state.accountId}
          />
        </Box>
        <Flex w="full">
          <MonthYearSelector
            display={['flex', 'flex', 'inline-flex']}
            w={['full', 'full', 'auto']}
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
        <TransactionExtraFilters
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

export { TransactionMainFilterActions };
