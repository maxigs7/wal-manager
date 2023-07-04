'use client';

import { PropsWithChildren } from 'react';

import { createContext } from '@/lib/react/context';

import { CategoryLookup } from '../models';

type Props = {
  categories: CategoryLookup[];
};

const [SubcategoryFormContextProvider, useSubcategoryMoveForm] = createContext<Props>({
  name: 'CategoryFormContext',
});

const Provider: React.FC<Props & PropsWithChildren> = ({ children, categories }) => {
  return (
    <SubcategoryFormContextProvider
      value={{
        categories,
      }}
    >
      {children}
    </SubcategoryFormContextProvider>
  );
};

export { Provider as SubcategoryMoveFormProvider, useSubcategoryMoveForm };
