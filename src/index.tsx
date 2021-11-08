import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/montserrat/300.css';
import './styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';

import { ApiProvider } from '@api';
import { startChakra } from '@lib/chakra-ui';
import { startFontAwesome } from '@lib/font-awesome';
import { AuthProvider, createSupabaseClient, SupabaseProvider } from '@lib/supabase';

import App from './App';

startFontAwesome();
const theme = startChakra();
const supabase = createSupabaseClient();
const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <SupabaseProvider supabase={supabase}>
        <AuthProvider>
          <ApiProvider>
            <QueryClientProvider client={queryClient}>
              <HelmetProvider>
                <ChakraProvider theme={theme}>
                  <App />
                </ChakraProvider>
              </HelmetProvider>
            </QueryClientProvider>
          </ApiProvider>
        </AuthProvider>
      </SupabaseProvider>
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
