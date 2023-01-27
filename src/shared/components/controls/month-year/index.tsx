import { useCallback } from 'react';

import { Control, RegisterOptions, useController } from 'react-hook-form';

import { MonthYear } from '../../month-year';

interface IProps {
  control: Control<any>;
  nameMonth: string;
  nameYear: string;
  rules?: RegisterOptions;
}

const MonthYearControl: React.FC<IProps> = ({ control, nameMonth, nameYear, rules }) => {
  const {
    field: { onChange: onChangeMonth, value: month },
  } = useController({
    name: nameMonth,
    control,
    rules,
  });
  const {
    field: { onChange: onChangeYear, value: year },
  } = useController({
    name: nameYear,
    control,
    rules,
  });

  const onChange = useCallback(
    (month: number, year: number) => {
      onChangeMonth(month);
      onChangeYear(year);
    },
    [onChangeMonth, onChangeYear],
  );

  return <MonthYear month={month} onChange={onChange} year={year} />;
};

export { MonthYearControl };
