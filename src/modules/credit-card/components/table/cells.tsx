import { CellProps } from 'react-table';

import { IconButton } from '@chakra-ui/react';

import { CreditCard } from '@models';
import { Icon } from '@shared';

type ActionsCellType = CellProps<CreditCard, string> & {
  onRemove(id: string): void;
  onUpdate(id: string): void;
};

export const ActionsCell: React.FC<ActionsCellType> = ({
  onRemove,
  onUpdate,
  row: { original },
}) => {
  if (!original.id) return null;

  return (
    <>
      <IconButton
        aria-label="Edit"
        icon={<Icon icon="edit" fixedWidth />}
        onClick={() => onUpdate(original.id)}
        size="sm"
      />
      <IconButton
        aria-label="Remove"
        colorScheme="danger"
        icon={<Icon icon="trash-alt" fixedWidth />}
        onClick={() => onRemove(original.id)}
        size="sm"
      />
    </>
  );
};
