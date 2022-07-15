import { CellProps } from 'react-table';

import { Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { formatToCurrency } from '@lib';
import { CategoryTag } from '@m/category';
import { CreditCardInline } from '@m/credit-card';
import { TransactionDto } from '@models';
import { Icon } from '@shared';

export const AccountableCell: React.FC<CellProps<TransactionDto, number>> = ({
  cell: { value },
}) => {
  const valueFormatted = formatToCurrency(Math.abs(value));
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
  onMoreActions(id: string): void;
  onRemove(id: string): void;
  onUpdate(id: string): void;
};

export const ActionsCell: React.FC<ActionsCellType> = ({
  onMoreActions,
  onRemove,
  onUpdate,
  row: { original },
}) => {
  if (!original.id) return null;

  return (
    <>
      <IconButton
        aria-label="More Actions"
        display={['inline-flex', 'none']}
        icon={<Icon icon="ellipsis-h" />}
        onClick={() => onMoreActions(original.id)}
        size="xs"
        variant="outline"
      />
      <Menu>
        <MenuButton
          aria-label="More Actions"
          as={IconButton}
          display={['none', 'inline-flex']}
          icon={<Icon icon="ellipsis-h" />}
          size="xs"
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<Icon icon="edit" fixedWidth />} onClick={() => onUpdate(original.id)}>
            Modificar
          </MenuItem>
          <MenuItem
            icon={<Icon icon="trash-alt" fixedWidth />}
            onClick={() => onRemove(original.id)}
          >
            Eliminar
          </MenuItem>
        </MenuList>
      </Menu>
    </>
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

export const CreditCardCell: React.FC<CellProps<TransactionDto, string>> = ({
  row: { original },
  value,
}) => {
  if (!original.creditCardType) return null;

  return (
    <HStack align="center">
      <CreditCardInline iconWidth={25} name={value} type={original.creditCardType} />
    </HStack>
  );
};

export const DescriptionCell: React.FC<CellProps<TransactionDto, string>> = ({
  row: { original },
  value,
}) => {
  if (!original.id) return <>{'BALANCE ACTUAL'}</>;

  return <>{value}</>;
};
