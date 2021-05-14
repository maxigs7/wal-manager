import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import 'tailwindcss/tailwind.css';

import { AuthProvider } from '@lib/auth';
import { startFirebase } from '@lib/firebase';

import App from './App';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

startFirebase();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
      </React.StrictMode>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
