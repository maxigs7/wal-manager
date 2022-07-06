import React from 'react';

import { useColorModeValue } from '@chakra-ui/react';
import {
  GroupBase,
  Props,
  Select as ReactSelect,
  SelectComponent,
  SelectInstance,
} from 'chakra-react-select';

export const Select = React.forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: Props<Option, IsMulti, Group>,
    ref:
      | ((instance: SelectInstance<Option, IsMulti, Group> | null) => void)
      | React.MutableRefObject<SelectInstance<Option, IsMulti, Group> | null>
      | null,
  ) => {
    const { chakraStyles, selectedOptionColor = 'accent' } = props;
    const bg = useColorModeValue('white', 'cello.700');
    return (
      <ReactSelect
        chakraStyles={{
          control: (provided) => ({
            ...provided,
            bg,
          }),
          ...chakraStyles,
        }}
        ref={ref}
        selectedOptionColor={selectedOptionColor}
        {...props}
      />
    );
  },
) as SelectComponent;
