import React from 'react';

import { withProviders } from './hocs';
import { AppProps } from 'next/app';
import { NextPageWithLayout } from '@layout';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default withProviders(App);
