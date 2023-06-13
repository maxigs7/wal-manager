'use client';

import { PropsWithChildren } from 'react';

import { createContext } from '@/lib/react/context';
import { Quotation } from '@/models';

type Props = {
  quotations: Quotation[];
};

const [AccountFormContextProvider, useAccountForm] = createContext<Props>({
  name: 'AccountFormContext',
});

const Provider: React.FC<Props & PropsWithChildren> = ({ children, quotations }) => {
  return (
    <AccountFormContextProvider
      value={{
        quotations,
      }}
    >
      {children}
    </AccountFormContextProvider>
  );
};

export { Provider as AccountFormProvider, useAccountForm };
