'use client';

import React, { useEffect, useRef } from 'react';

import { useMergeRefs } from '@chakra-ui/react';
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
        variant="flushed"
        chakraStyles={{
          control: (provided: any) => ({
            ...provided,
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
