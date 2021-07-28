import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/montserrat/300.css';
import './styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '@lib/auth';
import { startChakra } from '@lib/chakra-ui';
import { startFirebase } from '@lib/firebase';
import { startFontAwesome } from '@lib/font-awesome';

import App from './App';

startFirebase();
startFontAwesome();
const theme = startChakra();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
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
