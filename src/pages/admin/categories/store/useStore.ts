import { useCallback, useMemo, useReducer } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

import { CREATE_CATEGORY, EDIT_CATEGORY, SELECT_CATEGORY, SELECT_CATEGORY_TYPE } from './actions';
import { reducer } from './reducer';
import { initialState, IState } from './state';

const useStore = (): [IExtendedState, IDispatch] => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialState());

  const createCategory = useCallback(() => {
    dispatch({ type: CREATE_CATEGORY });
    onOpen();
  }, [dispatch, onOpen]);

  const editCategory = useCallback(
    (category: Category) => {
      dispatch({ type: EDIT_CATEGORY, payload: { id: category.id } });
      onOpen();
    },
    [dispatch, onOpen],
  );

  const selectCategory = useCallback(
    (category: Category) => {
      dispatch({ type: SELECT_CATEGORY, payload: { category } });
    },
    [dispatch],
  );

  const selectCategoryType = useCallback(
    (type: CategoryType) => {
      dispatch({ type: SELECT_CATEGORY_TYPE, payload: { type } });
    },
    [dispatch],
  );

  return useMemo(
    () => [
      {
        ...state,
        isOpen,
      },
      {
        createCategory,
        editCategory,
        selectCategory,
        selectCategoryType,
        onOpen,
        onClose,
      },
    ],
    [state, isOpen, onOpen, onClose],
  );
};

interface IExtendedState extends IState {
  isOpen: boolean;
}

interface IDispatch {
  createCategory(): void;
  editCategory(category: Category): void;
  onClose(): void;
  onOpen(): void;
  selectCategoryType(category: CategoryType): void;
  selectCategory(category: Category): void;
}

export default useStore;
