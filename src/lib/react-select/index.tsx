import { useColorModeValue } from '@chakra-ui/react';
import { Select as ReactSelect, SelectComponent } from 'chakra-react-select';

export const Select: SelectComponent = ({
  chakraStyles,
  selectedOptionColor = 'accent',
  ...props
}) => {
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
      selectedOptionColor={selectedOptionColor}
      {...props}
    />
  );
};
