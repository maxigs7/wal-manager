'use client';

import { useRouter } from 'next/navigation';
import { MutableRefObject, PropsWithChildren, useCallback } from 'react';

import { createContext } from '@/lib/react/context';

type ProviderProps = {
  cancelRef: MutableRefObject<null>;
};

type Props = ProviderProps & {
  onClose(): void;
};

const [LayoutContextProvider, useModalLayout] = createContext<Props>({
  name: 'ModalRemoveLayoutContext',
});

const Provider: React.FC<ProviderProps & PropsWithChildren> = ({ cancelRef, children }) => {
  const router = useRouter();
  const onCloseHandler = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <LayoutContextProvider
      value={{
        cancelRef,
        onClose: onCloseHandler,
      }}
    >
      {children}
    </LayoutContextProvider>
  );
};

export { Provider as LayoutProvider, useModalLayout };
