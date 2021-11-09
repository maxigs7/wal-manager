import { useCallback, useMemo, useReducer } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';

import { Category } from '@models';
import { CategoryType } from '@models/common';

import { selected, selectedId, selectedType } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

export const useStore = (): [IState, IDispatch] => {
  const { isOpen: isOpenForm, onClose: _onCloseForm, onOpen: _onOpenForm } = useDisclosure();
  const { isOpen: isOpenRemove, onClose: _onCloseRemove, onOpen: _onOpenRemove } = useDisclosure();
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

  const onCloseForm = () => {
    dispatch(selectedId());
    _onCloseForm();
  };

  const onOpenForm = (id: string) => {
    dispatch(selectedId({ id }));
    _onOpenForm();
  };

  const onCloseRemove = () => {
    dispatch(selectedId({ deselect: true }));
    _onCloseRemove();
  };

  const onOpenRemove = (id: string) => {
    dispatch(selectedId({ id }));
    _onOpenRemove();
  };

  return useMemo(
    () => [
      { ...state, isOpenForm, isOpenRemove },
      {
        formModal: {
          onClose: onCloseForm,
          onOpen: onOpenForm,
        },
        onSelected,
        onSelectedType,
        removeModal: {
          onClose: onCloseRemove,
          onOpen: onOpenRemove,
        },
      },
    ],
    [state, isOpenForm, isOpenRemove],
  );
};
