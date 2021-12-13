import { CellProps } from 'react-table';

import { Flex } from '@chakra-ui/react';

import { CategoryTag, TransactionDto } from '@entities';
import { Icon } from '@shared';

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
