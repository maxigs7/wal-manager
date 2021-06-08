import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'tailwindcss/tailwind.css';

import { AuthProvider } from '@lib/auth';
import { startFirebase } from '@lib/firebase';
import { startFontAwesome } from '@lib/font-awesome';

import App from './App';

startFirebase();
startFontAwesome();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
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
