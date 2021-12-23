import { CellProps } from 'react-table';

import { ButtonGroup, Flex, IconButton } from '@chakra-ui/react';

import { CategoryTag, TransactionDto } from '@entities';
import { Icon } from '@shared';

export const AccountableCell: React.FC<CellProps<TransactionDto, number>> = ({
  cell: { value },
}) => {
  const valueFormatted = Math.abs(value).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formatted = value < 0 ? `(${valueFormatted})` : valueFormatted;
  return (
    <Flex>
      <Icon icon="dollar-sign" mr="auto" />
      {formatted}
    </Flex>
  );
};

export const AccountCell: React.FC<CellProps<TransactionDto, string>> = ({ row: { original } }) => (
  <>{original.creditCard || original.account}</>
);

type ActionsCellType = CellProps<TransactionDto, string> & {
  onRemove(id: string): void;
  onUpdate(id: string): void;
};

export const ActionsCell: React.FC<ActionsCellType> = ({
  row: { original },
  onRemove,
  onUpdate,
}) => {
  if (!original.id) return null;

  return (
    <ButtonGroup size="xs" variant="outline" isAttached>
      <IconButton
        aria-label="Edit transaction"
        colorScheme="primary"
        icon={<Icon icon="edit" />}
        onClick={() => onUpdate(original.id)}
        variant="solid"
      />
      <IconButton
        aria-label="Remove transaction"
        colorScheme="danger"
        icon={<Icon icon="trash-alt" />}
        onClick={() => onRemove(original.id)}
        variant="solid"
      />
    </ButtonGroup>
  );
};

export const CategoryCell: React.FC<CellProps<TransactionDto, string>> = ({
  row: { original },
}) => {
  if (!original.id) return null;

  return (
    <CategoryTag
      color={original.rootCategoryColor}
      icon={original.rootCategoryIcon}
      name={original.rootCategory}
      subName={original.subCategory}
    />
  );
};

export const DescriptionCell: React.FC<CellProps<TransactionDto, string>> = ({
  row: { original },
  value,
}) => {
  if (!original.id) return <>{'BALANCE ACTUAL'}</>;

  return <>{value}</>;
};
