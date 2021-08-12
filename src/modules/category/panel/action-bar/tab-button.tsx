import { Button } from '@chakra-ui/react';

import { CategoryType } from '@app/api/common';

const TabButton: React.FC<IProps> = ({ children, isSelected, onSelected, type }) => {
  const onClickHandler = () => onSelected(type);
  const hover = isSelected
    ? {
        bg: 'blue.300',
      }
    : undefined;
  return (
    <Button
      _focus={{ outline: 'none' }}
      _hover={hover}
      bg={isSelected ? 'blue.500' : 'transparent'}
      borderRadius="0"
      color={isSelected ? 'white' : 'gray.800'}
      onClick={onClickHandler}
      size="lg"
    >
      {children}
    </Button>
  );
};

interface IProps {
  isSelected: boolean;
  onSelected(type: CategoryType): void;
  type: CategoryType;
}

export { TabButton };
