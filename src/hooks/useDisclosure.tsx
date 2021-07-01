import { useCallback, useState } from 'react';

type InitialState = boolean | (() => boolean);

const useDisclosure = (initialState: InitialState = false): readonly [boolean, any] => {
  const [isOpen, setIsOpen] = useState(initialState || false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return [
    !!isOpen,
    {
      onOpen,
      onClose,
      onToggle,
    },
  ] as const;
};

export { useDisclosure };
