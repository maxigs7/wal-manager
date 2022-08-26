import React from 'react';

import { withProviders } from './hocs';
import { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withProviders(App);
