import { FC, forwardRef, useCallback, useMemo } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { useController, UseControllerProps } from 'react-hook-form';

import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StyleObjectOrFn,
  Text,
  useTheme,
  css as chakraCSS,
} from '@chakra-ui/react';
import { ClassNames } from '@emotion/react';

import Icon from '../icon';

const CustomInput = forwardRef<any, any>((props, ref) => {
  return (
    <InputGroup>
      <Input {...props} ref={ref} />
      <InputRightElement
        children={<Icon icon="calendar-alt" />}
        pointerEvents="none"
        userSelect="none"
      />
    </InputGroup>
  );
});

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => {
  return (
    <Stack alignItems="center" pb={1} pl={4} pr={2} textAlign="left" isInline>
      <Text color="gray.700" flex={1} fontSize="sm" fontWeight="medium">
        {new Intl.DateTimeFormat('en-AU', {
          year: 'numeric',
          month: 'long',
        }).format(date)}
      </Text>
      <IconButton
        aria-label="Previous Month"
        borderRadius="full"
        disabled={prevMonthButtonDisabled}
        icon={<Icon fontSize="14px" icon="chevron-left" />}
        onClick={decreaseMonth}
        size="sm"
        variant="ghost"
      />
      <IconButton
        aria-label="Next Month"
        borderRadius="full"
        disabled={nextMonthButtonDisabled}
        icon={<Icon fontSize="14px" icon="chevron-right" />}
        onClick={increaseMonth}
        size="sm"
        variant="ghost"
      />
    </Stack>
  );
};

function useDatePickerStyles() {
  const theme = useTheme();
  return useMemo(() => {
    const defaultStyles: StyleObjectOrFn = {
      p: 2,
      bg: 'white',
      border: '1px solid',
      borderColor: 'gray.100',
      boxShadow: 'sm',
      '& .react-datepicker': {
        '&__header': {
          bg: 'none',
          borderBottom: 'none',
        },
        '&__month': {
          mt: 0,
        },
        '&__day-name': {
          color: 'gray.400',
          fontWeight: 'medium',
          w: 7,
        },
        '&__day': {
          lineHeight: '28px',
          color: 'gray.700',
          w: 7,
          h: 7,
          borderRadius: 'full',
        },
        '&__day:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected):hover':
          {
            bg: 'white',
            boxShadow: '0 0 1px 1px rgba(0,0,0,0.2)',
          },
        '&__day--today': {
          bg: 'gray.100',
          fontWeight: '400',
        },
        '&__day--selected, &__day--keyboard-selected': {
          bg: 'gray.700',
          color: 'white',
        },
      },
    };
    return chakraCSS(defaultStyles)(theme);
  }, [theme]);
}

export interface IProps extends UseControllerProps<any> {
  id?: string;
}

const Datepicker: FC<IProps> = ({ control, defaultValue, name, rules }) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  const styles = useDatePickerStyles();

  const render = useCallback(
    ({ css }) => {
      return (
        <ReactDatePicker
          calendarClassName={css(styles)}
          customInput={<CustomInput />}
          onChange={(date) => (Array.isArray(date) ? onChange(date[0]) : onChange(date))}
          popperClassName={css()}
          renderCustomHeader={CustomHeader}
          selected={value}
          showPopperArrow={false}
          showYearDropdown
        />
      );
    },
    [styles, value],
  );

  return <ClassNames>{render}</ClassNames>;
};

export default Datepicker;
