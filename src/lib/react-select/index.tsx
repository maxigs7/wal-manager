'use client';

import React, { useEffect, useRef } from 'react';

import { useColorModeValue, useMergeRefs } from '@chakra-ui/react';
import {
  GroupBase,
  Props,
  Select as ReactSelect,
  SelectComponent,
  SelectInstance,
} from 'chakra-react-select';

const SelectWrapper = React.forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: Props<Option, IsMulti, Group>,
    ref:
      | ((instance: SelectInstance<Option, IsMulti, Group> | null) => void)
      | React.MutableRefObject<SelectInstance<Option, IsMulti, Group> | null>
      | null,
  ) => {
    const { chakraStyles, selectedOptionColor = 'accent', value } = props;
    const bg = useColorModeValue('white', 'accent.700');
    const internalRef = useRef<SelectInstance<Option, IsMulti, Group>>(null);
    const mergedRef = useMergeRefs(ref, internalRef);

    useEffect(() => {
      if (typeof value === 'undefined' || (value === null && !props.defaultValue)) {
        internalRef?.current?.clearValue();
      }
    }, [props.defaultValue, value]);

    return (
      <ReactSelect
        ref={mergedRef}
        selectedOptionColor={selectedOptionColor}
        chakraStyles={{
          control: (provided: any) => ({
            ...provided,
            bg,
            variant: 'flushed',
          }),
          ...chakraStyles,
        }}
        {...props}
      />
    );
  },
);

SelectWrapper.displayName = 'ReactSelect';

export const Select = SelectWrapper as SelectComponent;
