import { useCallback } from 'react';
import { CellProps } from 'react-table';

import { ButtonGroup, IconButton } from '@chakra-ui/react';

import { CategoryRow } from '@models';
import { Icon } from '@shared';

export type Actions = {
  onRemove(id: string): void;
  onSubCreate(parentId: string): void;
  onSubRemove(parentId: string, id: string): void;
  onSubUpdate(parentId: string, id: string): void;
  onUpdate(id: string): void;
};

export type ActionsCellType = CellProps<CategoryRow, string> & Actions;

export const ActionsCell: React.FC<ActionsCellType> = ({
  onRemove,
  onSubCreate,
  onSubRemove,
  onSubUpdate,
  onUpdate,
  row: { original },
}) => {
  if (!original.id) return null;

  const onRemoveHandler = useCallback(() => {
    if (original.parentId) {
      onSubRemove(original.parentId, original.id);
      return;
    }
    onRemove(original.id);
  }, [onRemove, onSubRemove, original.parentId, original.id]);

  const onUpdateHandler = useCallback(() => {
    if (original.parentId) {
      onSubUpdate(original.parentId, original.id);
      return;
    }
    onUpdate(original.id);
  }, [onUpdate, onSubUpdate, original.parentId, original.id]);

  return (
    <ButtonGroup size="sm" variant="outline" isAttached>
      {!original.parentId && (
        <IconButton
          aria-label="Add new sub category"
          colorScheme="success"
          icon={<Icon icon="plus" fixedWidth />}
          onClick={() => onSubCreate(original.id)}
          size="sm"
        />
      )}
      <IconButton
        aria-label="Edit"
        colorScheme="info"
        icon={<Icon icon="edit" fixedWidth />}
        onClick={onUpdateHandler}
        size="sm"
      />
      <IconButton
        aria-label="Remove"
        colorScheme="danger"
        icon={<Icon icon="trash-alt" fixedWidth />}
        onClick={onRemoveHandler}
        size="sm"
      />
    </ButtonGroup>
  );
};
