import React from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';

interface IProps {
  isActive: boolean;
  index: number;
  month: string;
  onUpdateMonth(index: number): void;
}

const activeStyle = (isSelected: boolean): Partial<ButtonProps> =>
  isSelected
    ? {
        borderBottom: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: 'accent.400',
      }
    : {};

const MonthButton: React.FC<IProps> = ({ isActive, index, month, onUpdateMonth }) => (
  <Button
    {...activeStyle(isActive)}
    _focus={{ outline: 'none' }}
    borderRadius={0}
    flexBasis="100%"
    onClick={() => onUpdateMonth(index)}
    px={10}
    textTransform="uppercase"
    variant="ghost"
  >
    {month}
  </Button>
);

export default React.memo(MonthButton);
