import { Button } from '@chakra-ui/react';

import { CategoryType } from '@entities';

const borderActive = (color: string) => ({
  borderBottom: 3,
  borderBottomColor: color,
  borderBottomStyle: 'solid',
});

const TabButton: React.FC<IProps> = ({ children, color, isSelected, onSelected, type }) => {
  const onClickHandler = () => onSelected && onSelected(type);
  const props = isSelected ? borderActive(color) : {};
  return (
    <Button
      {...props}
      _focus={{ outline: 'none' }}
      _hover={borderActive(color)}
      bg="transparent"
      borderRadius="0"
      onClick={onClickHandler}
      size="lg"
      transition="border-bottom 0.3s ease-out"
    >
      {children}
    </Button>
  );
};

interface IProps {
  color: string;
  isSelected: boolean;
  onSelected?(type: CategoryType): void;
  type: CategoryType;
}

export { TabButton };
