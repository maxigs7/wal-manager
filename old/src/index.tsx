import React from 'react';
import ReactDOM from 'react-dom';

import '@fontsource/montserrat/100.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

import './styles/globals.css';

import { startFontAwesome } from '@lib';

import App from './app';

startFontAwesome();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (import.meta.env.DEV) {
  import(/* webpackChunkName: 'web-vital' */ './reportWebVitals').then((module) => {
    module.default(console.log);
  });
}
