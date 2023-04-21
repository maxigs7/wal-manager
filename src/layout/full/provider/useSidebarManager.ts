'use client';

import { useCallback, useEffect, useState } from 'react';

import { UseDisclosureReturn, useDisclosure, useMediaQuery } from '@chakra-ui/react';

export type UseSidebarManagerReturn = UseDisclosureReturn & { isTouched: boolean };

export const useSidebarManager = () => {
  const [isLg] = useMediaQuery('(min-width: 960px)');
  const [isTouched, setIsTouched] = useState(false);

  const { onOpen, onClose, onToggle, ...disclosure } = useDisclosure({
    id: 'sidebar',
  });

  const onOpenHandler = useCallback(() => {
    setIsTouched(true);
    onOpen();
  }, [onOpen]);

  const onCloseHandler = useCallback(() => {
    setIsTouched(true);
    onClose();
  }, [onClose]);

  const onToggleHandler = useCallback(() => {
    setIsTouched(true);
    onToggle();
  }, [onToggle]);

  useEffect(() => {
    if (!isTouched && !isLg) {
      onClose();
    } else if (!isTouched && isLg) {
      onOpen();
    }
  }, [isLg, isTouched, onClose, onOpen]);

  return {
    ...disclosure,
    isTouched,
    onClose: onCloseHandler,
    onOpen: onOpenHandler,
    onToggle: onToggleHandler,
  };
};
