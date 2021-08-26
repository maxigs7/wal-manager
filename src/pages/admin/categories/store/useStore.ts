import { useCallback, useMemo, useReducer } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

import {
  CREATE_CATEGORY_END,
  CREATE_CATEGORY_START,
  DELETE_CATEGORY_END,
  DELETE_CATEGORY_START,
  SELECT_CATEGORY,
  SELECT_CATEGORY_TYPE,
  UPDATE_CATEGORY_END,
  UPDATE_CATEGORY_START,
} from './actions';
import { reducer } from './reducer';
import { initialState, IState } from './state';

const useStore = (): [IExtendedState, IDispatch] => {
  const { isOpen: isModalOpen, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
  const { isOpen: isDialogOpen, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialState());

  const create = useCallback(() => {
    dispatch({ type: CREATE_CATEGORY_START });
    onOpenModal();
  }, [dispatch, isModalOpen, onOpenModal]);

  const onDialogClose = useCallback(() => {
    dispatch({ type: DELETE_CATEGORY_END });
    onCloseDialog();
  }, [dispatch, isDialogOpen, onCloseDialog]);

  const onModalClose = useCallback(() => {
    if (state.categoryId) {
      dispatch({ type: UPDATE_CATEGORY_END });
    } else {
      dispatch({ type: CREATE_CATEGORY_END });
    }
    onCloseModal();
  }, [dispatch, isModalOpen, onCloseModal, state.categoryId]);

  const remove = useCallback(
    (id: string) => {
      dispatch({ type: DELETE_CATEGORY_START, payload: { id } });
      onOpenDialog();
    },
    [dispatch, isDialogOpen, onOpenDialog],
  );

  const select = useCallback(
    (category: Category) => {
      dispatch({ type: SELECT_CATEGORY, payload: { category } });
    },
    [dispatch],
  );

  const selectType = useCallback(
    (type: CategoryType) => {
      dispatch({ type: SELECT_CATEGORY_TYPE, payload: { type } });
    },
    [dispatch],
  );

  const update = useCallback(
    (id: string) => {
      dispatch({ type: UPDATE_CATEGORY_START, payload: { id } });
      onOpenModal();
    },
    [dispatch, isModalOpen, onOpenModal],
  );

  return useMemo(
    () => [
      {
        ...state,
        isDialogOpen,
        isModalOpen,
      },
      {
        create,
        onDialogClose,
        onModalClose,
        remove,
        select,
        selectType,
        update,
      },
    ],
    [
      create,
      isDialogOpen,
      isModalOpen,
      onDialogClose,
      onModalClose,
      remove,
      select,
      selectType,
      state,
      update,
    ],
  );
};

interface IExtendedState extends IState {
  isDialogOpen: boolean;
  isModalOpen: boolean;
}

interface IDispatch {
  create(): void;
  onDialogClose(): void;
  onModalClose(): void;
  remove(id: string): void;
  select(category: Category): void;
  selectType(type: CategoryType): void;
  update(id: string): void;
}

export default useStore;
