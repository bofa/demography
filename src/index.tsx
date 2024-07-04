import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import queryString from 'query-string';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryStringOptions = { arrayFormat: 'comma' } as const
const queryClient = new QueryClient()

ReactDOM.render(
  <HashRouter>
    <QueryParamProvider
      adapter={ReactRouter6Adapter}
      options={{
        searchStringToObject: text => queryString.parse(text, queryStringOptions),
        objectToSearchString: obj => queryString.stringify(obj, queryStringOptions),
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </QueryParamProvider>
  </HashRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
