import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux';
import AppContainer from './App/AppContainer'

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>
        , document.getElementById('cape-canaveral'));
};

render(AppContainer);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}
