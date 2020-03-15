import './index.css';

import App from './App';
import { I18nextProvider } from "react-i18next";
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import i18n from './i18n';
import store from './store';

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App isLogged={false} />
      </Provider>
    </I18nextProvider>,
    document.getElementById("root")
);