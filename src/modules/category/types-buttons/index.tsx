import { CategoryType } from '@app/api/common';
import { Button, ButtonShapes } from '@app/modules/common';
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
        color="transparent"
        key={item.type}
        onClick={() => onSelected(item.type)}
        shape={ButtonShapes.SQUARE}
      >
        {item.label}
      </Button>
    ))}
  </div>
);

export { TypesButtons };
