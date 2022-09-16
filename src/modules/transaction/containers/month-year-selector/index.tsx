import { Button, ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';
import { parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { useTransactionStore } from '@m/transaction';
import { Icon } from '@shared';

const MonthYearSelector: React.FC<ButtonGroupProps> = (props) => {
  const { query } = useRouter();
  const [state, dispatch] = useTransactionStore();

  const monthAbbr = useMemo(() => {
    return es.localize?.month(state.month, { width: 'abbreviated' });
  }, [state.month]);

  const nextMonthHandler = () => {
    dispatch.onNextMonth();
  };

  const previousMonthHandler = () => {
    dispatch.onPreviousMonth();
  };

  useEffect(() => {
    if (query.date) {
      const date = parseISO(query.date as string);
      dispatch.onChangedMonthYear(date.getMonth(), date.getFullYear());
    }
  }, [dispatch, query.date]);

  return (
    <ButtonGroup colorScheme="accent" variant="solid" isAttached {...props}>
      <IconButton
        aria-label="previous month"
        icon={<Icon icon="angle-double-left" fixedWidth />}
        onClick={previousMonthHandler}
      />
      <Button textTransform="uppercase" w="full">
        {monthAbbr} / {state.year}
      </Button>
      <IconButton
        aria-label="next month"
        icon={<Icon icon="angle-double-right" fixedWidth />}
        onClick={nextMonthHandler}
      />
    </ButtonGroup>
  );
};

export { MonthYearSelector };
