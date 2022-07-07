import React, { useMemo } from 'react';

import { Button, ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';
import { es } from 'date-fns/locale';

import { useTransactionStore } from '@m/transaction';
import { Icon } from '@shared';

const MonthYearSelector: React.FC<ButtonGroupProps> = (props) => {
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

  return (
    <>
      <ButtonGroup colorScheme="accent" variant="solid" isAttached {...props}>
        <IconButton
          aria-label="previous month"
          icon={<Icon icon="angle-double-left" fixedWidth />}
          onClick={previousMonthHandler}
        />
        <Button textTransform="uppercase" w="full">
          {state.year} - {monthAbbr}
        </Button>
        <IconButton
          aria-label="next month"
          icon={<Icon icon="angle-double-right" fixedWidth />}
          onClick={nextMonthHandler}
        />
      </ButtonGroup>
    </>
  );
};

export default MonthYearSelector;
