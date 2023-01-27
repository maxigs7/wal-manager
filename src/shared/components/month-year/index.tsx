import React, { useMemo } from 'react';

import { Button, ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';
import { es } from 'date-fns/locale';

import { Icon } from '@/shared';

export type MonthYearProps = Omit<ButtonGroupProps, 'onChange'> & {
  onChange(month: number, year: number): void;
  month?: number;
  year?: number;
};

const MonthYear: React.FC<MonthYearProps> = ({
  month = new Date().getMonth(),
  onChange,
  year = new Date().getFullYear(),
  ...props
}) => {
  const monthAbbr = useMemo(() => {
    return es.localize?.month(month, { width: 'abbreviated' });
  }, [month]);

  const nextMonthHandler = () => {
    onChange(month === 11 ? 0 : month + 1, month === 11 ? year + 1 : year);
  };

  const previousMonthHandler = () => {
    onChange(month === 0 ? 11 : month - 1, month === 0 ? year - 1 : year);
  };

  return (
    <ButtonGroup colorScheme="accent" variant="solid" isAttached {...props}>
      <IconButton
        aria-label="previous month"
        icon={<Icon icon="angle-double-left" fixedWidth />}
        onClick={previousMonthHandler}
      />
      <Button textTransform="uppercase" w="full">
        {monthAbbr} / {year}
      </Button>
      <IconButton
        aria-label="next month"
        icon={<Icon icon="angle-double-right" fixedWidth />}
        onClick={nextMonthHandler}
      />
    </ButtonGroup>
  );
};

export { MonthYear };
