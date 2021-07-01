// Hook

import { useCallback, useState } from 'react';

type InitialState = boolean | (() => boolean);

// Parameter is the boolean, with default "false" value
export const useToggle = (initialState: InitialState = false): readonly [boolean, any] => {
  // Initialize the state
  const [value, setValue] = useState(initialState);

  const on = useCallback(() => {
    setValue(true);
  }, []);

  const off = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, { on, off, toggle }] as const;
};
