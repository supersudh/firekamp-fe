import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.scss';
import App from './App';

import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const props: any = {};
root.render(
  <Provider store={store}>
    <App {...props} />
  </Provider>
);
