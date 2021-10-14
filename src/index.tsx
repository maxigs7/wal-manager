import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/montserrat/300.css';
import './styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

import { startChakra } from '@lib/chakra-ui';
import { WalFirebaseAppProvider } from '@lib/firebase';
import { FIREBASE_CONFIG } from '@lib/firebase/config';
import { startFontAwesome } from '@lib/font-awesome';

import App from './App';
import { getUow } from './models/uow';
import { runSagas, store } from './stores';

startFontAwesome();
const theme = startChakra();
const app = initializeApp(FIREBASE_CONFIG);
const authSdk = getAuth(app);
const firestoreSdk = getFirestore(app);
const uow = getUow(firestoreSdk);

runSagas(authSdk, firestoreSdk, uow);

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <WalFirebaseAppProvider app={app} authSdk={authSdk} firestoreSdk={firestoreSdk}>
        <Provider store={store}>
          <HelmetProvider>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </HelmetProvider>
        </Provider>
      </WalFirebaseAppProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (process.env.NODE_ENV === 'development') {
  import(/* webpackChunkName: 'web-vital' */ './reportWebVitals').then((module) => {
    module.default(console.log);
  });
}
