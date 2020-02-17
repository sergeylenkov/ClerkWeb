import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from "react-i18next";
import { Provider } from 'react-redux'
import App from './App';
import i18n from './i18n';
import store from './store';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
