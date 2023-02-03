'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

import { NextFont } from '@next/font';
import { Montserrat } from '@next/font/google';

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({
  subsets: ['latin'],
  // default, can also use "swap" to ensure custom font always shows
  display: 'optional',
});

export const NextFontsContext: React.Context<NextFont> = createContext<NextFont>({} as NextFont);

export const NextFontsProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <NextFontsContext.Provider value={montserrat}>{children}</NextFontsContext.Provider>
);

export const useNextFont = (): NextFont => {
  const context = useContext(NextFontsContext);
  if (context === undefined) {
    throw new Error(`useNextFont must be used within a NextFontsProvider.`);
  }
  return context;
};
