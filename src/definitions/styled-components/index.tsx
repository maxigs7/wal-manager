export * from './common';
export * from './dark';
export * from './light';

import React, { ReactElement } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { dark } from './dark';
import { light } from './light';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggle: () => undefined,
});

export type ThemeContextProps = {
  theme: DefaultTheme;
  toggle: () => undefined;
  themeName: string;
};

export const useTheme = (): ThemeContextProps => {
  const { theme, toggle } = React.useContext(ThemeContext);

  return {
    theme: theme === 'light' ? light : dark,
    toggle,
    themeName: theme,
  };
};

export const StyledThemeProvider: React.FC = ({ children }): ReactElement => {
  const [theme, setTheme] = React.useState('light');

  const toggle = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
    return undefined;
  };
  const values = React.useMemo(
    () => ({
      theme,
      toggle,
    }),
    [toggle, theme],
  );

  return (
    <ThemeContext.Provider value={values}>
      <ThemeProvider theme={theme === 'light' ? light : dark}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
