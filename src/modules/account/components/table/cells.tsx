import { CellProps } from 'react-table';

import { ButtonGroup, IconButton } from '@chakra-ui/react';

import { Account } from '@models';
import { Icon } from '@shared';

type ActionsCellType = CellProps<Account, string> & {
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
    <ButtonGroup size="sm" variant="outline" isAttached>
      <IconButton
        aria-label="Edit"
        colorScheme="info"
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
    </ButtonGroup>
  );
};
