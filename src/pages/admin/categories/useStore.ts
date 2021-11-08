import { useCallback, useMemo, useReducer } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';

import { Category } from '@models/categories';
import { CategoryType } from '@models/common';

// TODO: MOVE ALL TO STORE FOLDER AFTER REMOVING FIREBASE
interface IModalDispatch {
  onClose(): void;
  onOpen(id?: string): void;
}

interface IState {
  id?: string;
  isOpenForm: boolean;
  isOpenRemove: boolean;
  selectedType: CategoryType;
  selected?: Category;
}

interface IDispatch {
  formModal: IModalDispatch;
  onSelected(category: Category): void;
  onSelectedType(type: CategoryType): void;
  removeModal: IModalDispatch;
}

const SELECTED = '[CATEGORY] Selected';
const SELECTED_ID = '[CATEGORY] Selected Id';
const SELECTED_TYPE = '[CATEGORY] Selected type';
type Actions =
  | { type: typeof SELECTED; payload: Category }
  | { type: typeof SELECTED_ID; payload?: { id?: string; deselect?: boolean } }
  | { type: typeof SELECTED_TYPE; payload: CategoryType };

const initialState: IState = {
  isOpenForm: false,
  isOpenRemove: false,
  selectedType: CategoryType.Expense,
};

const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case SELECTED_ID:
      return {
        ...state,
        id: action.payload?.id,
        selected: action.payload?.deselect ? undefined : state.selected,
      };
    case SELECTED_TYPE:
      return {
        ...state,
        selectedType: action.payload,
        selected: undefined,
      };
    default:
      return state;
  }
};

export const useStore = (): [IState, IDispatch] => {
  const { isOpen: isOpenForm, onClose: _onCloseForm, onOpen: _onOpenForm } = useDisclosure();
  const { isOpen: isOpenRemove, onClose: _onCloseRemove, onOpen: _onOpenRemove } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSelected = useCallback(
    (category: Category) => {
      dispatch({ type: SELECTED, payload: category });
    },
    [dispatch],
  );

  const onSelectedType = useCallback(
    (type: CategoryType) => {
      dispatch({ type: SELECTED_TYPE, payload: type });
    },
    [dispatch],
  );

  const onCloseRemove = () => {
    dispatch({ type: SELECTED_ID, payload: { deselect: true } });

    _onCloseRemove();
  };

  const onOpenRemove = (id: string) => {
    dispatch({ type: SELECTED_ID, payload: { id } });
    _onOpenRemove();
  };

  const onCloseForm = () => {
    dispatch({ type: SELECTED_ID });
    _onCloseForm();
  };

  const onOpenForm = (id: string) => {
    dispatch({ type: SELECTED_ID, payload: { id } });
    _onOpenForm();
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
