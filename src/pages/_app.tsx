import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { StyledThemeProvider } from '@definitions/styled-components';
import { Provider } from 'react-redux';
import store, { storeWrapper } from '@redux/store';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <StyledThemeProvider>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </StyledThemeProvider>
);

export default storeWrapper.withRedux(App);
