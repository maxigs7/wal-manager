import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { changeText, IDispatch, initialState, IState, reducer } from './text-filter-store';

export const TextFilterContext: React.Context<[IState, IDispatch]> = createContext<
  [IState, IDispatch]
>([{}, {}] as [IState, IDispatch]);

export const useTextFilter = () => useContext(TextFilterContext);

export const TextFilterProvider: React.FC = ({ children }) => {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangedText = useCallback(
    (text: string) => {
      dispatch(changeText(text));
    },
    [dispatch],
  );

  const storeDispatch = useMemo(
    () => ({
      onChangedText,
      onClose,
      onOpen,
      onToggle,
    }),
    [isOpen],
  );

  const extendedState = useMemo(
    () => ({
      ...state,
      isOpen,
    }),
    [isOpen, state],
  );

  return (
    <TextFilterContext.Provider value={[extendedState, storeDispatch]}>
      {children}
    </TextFilterContext.Provider>
  );
};
