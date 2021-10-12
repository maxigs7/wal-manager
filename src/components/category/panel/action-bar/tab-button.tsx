import { Button } from '@chakra-ui/react';

import { CategoryType } from '@app/models/common';

const TabButton: React.FC<IProps> = ({ children, isSelected, onSelected, type }) => {
  const onClickHandler = () => onSelected && onSelected(type);
  const hover = isSelected
    ? {
        bg: 'crimson.800',
      }
    : undefined;
  return (
    <Button
      _focus={{ outline: 'none' }}
      _hover={hover}
      bg={isSelected ? 'crimson.500' : 'transparent'}
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
  onSelected?(type: CategoryType): void;
  type: CategoryType;
}

export { TabButton };
