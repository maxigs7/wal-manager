import { useColorModeValue } from '@chakra-ui/react';
import {
  GroupBase,
  Props,
  Select as ReactSelect,
  SelectComponent,
  SelectInstance,
} from 'chakra-react-select';
import React from 'react';

const SelectWrapper = React.forwardRef(
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
        ref={ref}
        selectedOptionColor={selectedOptionColor}
        chakraStyles={{
          control: (provided: any) => ({
            ...provided,
            bg,
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
