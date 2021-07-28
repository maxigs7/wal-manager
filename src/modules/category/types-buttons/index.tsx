import { Button } from '@chakra-ui/react';

import { CategoryType } from '@app/api/common';
import classnames from '@lib/classnames';

interface IProps {
  onSelected: (type: CategoryType) => void;
  selectedType: CategoryType;
}

const styles = {
  buttonTypes: (isActive: boolean) =>
    classnames(
      'flex-1 p-5 hover:border-b-2 hover:border-primary-500',
      isActive && 'border-b-2 border-primary-500',
    ),
  categoryTypes: 'flex',
};

const buttons = [
  {
    label: 'Gastos',
    type: CategoryType.Expense,
  },
  {
    label: 'Ingresos',
    type: CategoryType.Income,
  },
];

const TypesButtons: React.FC<IProps> = ({ onSelected, selectedType = CategoryType.Expense }) => (
  <div className={styles.categoryTypes}>
    {buttons.map((item) => (
      <Button
        className={styles.buttonTypes(selectedType === item.type)}
        key={item.type}
        onClick={() => onSelected(item.type)}
      >
        {item.label}
      </Button>
    ))}
  </div>
);

export { TypesButtons };
