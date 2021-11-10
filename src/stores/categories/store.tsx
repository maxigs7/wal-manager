import { useCallback, useMemo, useReducer } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';

import { Category } from '@models';
import { CategoryType } from '@models/common';

import { selected, selectedId, selectedType } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

export const useStore = (): [IState, IDispatch] => {
  const { isOpen: isOpenForm, onClose: onCloseForm, onOpen: _onOpenForm } = useDisclosure();
  const { isOpen: isOpenRemove, onClose: onCloseRemove, onOpen: _onOpenRemove } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSelected = useCallback(
    (category: Category) => {
      dispatch(selected(category));
    },
    [dispatch],
  );

  const onSelectedType = useCallback(
    (type: CategoryType) => {
      dispatch(selectedType(type));
    },
    [dispatch],
  );

  const onConfirmedForm = useCallback(
    (category: Category) => {
      dispatch(selectedId());
      onSelected(category);
      onCloseForm();
    },
    [dispatch, onSelected, onCloseForm],
  );

  const onOpenForm = useCallback(
    (id: string) => {
      dispatch(selectedId({ id }));
      _onOpenForm();
    },
    [dispatch, _onOpenForm],
  );

  const onConfirmedRemove = useCallback(() => {
    dispatch(selectedId({ deselect: true }));
    onCloseRemove();
  }, [dispatch, onCloseRemove]);

  const onOpenRemove = useCallback(
    (id: string) => {
      dispatch(selectedId({ id }));
      _onOpenRemove();
    },
    [dispatch, _onOpenRemove],
  );

  return useMemo(
    () => [
      { ...state, isOpenForm, isOpenRemove },
      {
        formModal: {
          onConfirmed: onConfirmedForm,
          onDismiss: onCloseForm,
          onOpen: onOpenForm,
        },
        onSelected,
        onSelectedType,
        removeModal: {
          onConfirmed: onConfirmedRemove,
          onDismiss: onCloseRemove,
          onOpen: onOpenRemove,
        },
      },
    ],
    [state, isOpenForm, isOpenRemove],
  );
};
