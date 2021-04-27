import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { createApi } from './api';
import App from './App';
import './assets/styles/tailwind.css';
import { startFirebase } from './firebase-config';
import { ApiProvider, FirebaseProvider, UserProvider } from './providers';
import reportWebVitals from './reportWebVitals';

const appRoot = document.getElementById('root');
const appFirebase = startFirebase();
const api = createApi(appFirebase);
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FirebaseProvider value={appFirebase}>
          <UserProvider>
            <ApiProvider value={api}>
              <App />
            </ApiProvider>
          </UserProvider>
        </FirebaseProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  appRoot,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
