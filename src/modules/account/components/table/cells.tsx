import { ButtonGroup, IconButton } from '@chakra-ui/react';

import { Account } from '@models';
import { Icon } from '@shared';

type ActionsCellType = {
  onRemove(id: string): void;
  onUpdate(id: string): void;
  row: Account;
};

export const ActionsCell: React.FC<ActionsCellType> = ({ onRemove, onUpdate, row }) => {
  if (!row.id) return null;

  return (
    <ButtonGroup size="sm" variant="outline" isAttached>
      <IconButton
        aria-label="Edit"
        colorScheme="info"
        icon={<Icon icon="edit" fixedWidth />}
        onClick={() => onUpdate(row.id)}
        size="sm"
      />
      <IconButton
        aria-label="Remove"
        colorScheme="danger"
        icon={<Icon icon="trash-alt" fixedWidth />}
        onClick={() => onRemove(row.id)}
        size="sm"
      />
    </ButtonGroup>
  );
};
