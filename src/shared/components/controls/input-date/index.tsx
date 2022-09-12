import { ClassNames, ClassNamesContent } from '@emotion/react';
import { FC, useCallback, useMemo } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useController, UseControllerProps } from 'react-hook-form';

import { useMediaQuery } from '@lib';

import { CustomHeader } from './header';
import { CustomInput } from './input';
import { useStyles } from './useStyles';

export interface IProps extends UseControllerProps<any> {
  id?: string;
}

const InputDate: FC<IProps> = ({ control, defaultValue, name, rules }) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  const styles = useStyles();
  const { xs, sm, md } = useMediaQuery();
  const withPortal = useMemo(() => xs || sm || md, [xs, sm, md]);

  const render = useCallback(
    ({ css }: ClassNamesContent) => {
      return (
        <ReactDatePicker
          calendarClassName={css(styles)}
          customInput={<CustomInput />}
          onChange={(date: Date) => onChange(date)}
          portalId="calendarPortal"
          renderCustomHeader={CustomHeader}
          selected={value}
          showPopperArrow={false}
          withPortal={withPortal}
        />
      );
    },
    [onChange, styles, value, withPortal],
  );

  return <ClassNames>{render}</ClassNames>;
  // return (
  //   // <InputGroup className={'dark-theme'}>
  // <ClassNames>{render}</ClassNames>;
  //   <ReactDatePicker
  //     customInput={<CustomInput />}
  //     onChange={(date: Date) => onChange(date)}
  //     portalId="calendarPortal"
  //     renderCustomHeader={CustomHeader}
  //     selected={value}
  //     showPopperArrow={false}
  //     withPortal={withPortal}
  //   />
  //   <InputRightElement>
  //     <Icon icon="calendar" />
  //   </InputRightElement>
  // </InputGroup>
  // <ReactDatePicker
  //   onChange={(date: Date) => onChange(date)}
  //   portalId="calendarPortal"
  //   selected={value}
  //   showPopperArrow={false}
  //   withPortal={withPortal}
  // />
  // );
};

export { InputDate };
