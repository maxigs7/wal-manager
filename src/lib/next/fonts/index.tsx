import { createContext, PropsWithChildren, useContext } from 'react';

import { NextFont } from '@next/font';

interface IProps extends PropsWithChildren {
  font: NextFont;
}

export const NextFontsContext: React.Context<NextFont> = createContext<NextFont>({} as NextFont);

export const NextFontsProvider: React.FC<IProps> = ({ children, font }) => (
  <NextFontsContext.Provider value={font}>{children}</NextFontsContext.Provider>
);

export const useNextFont = (): NextFont => {
  const context = useContext(NextFontsContext);
  if (context === undefined) {
    throw new Error(`useSupabase must be used within a SupabaseProvider.`);
  }
  return context;
};
