'use strict';

import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

let AppRouter = require('./router').default;

const store = configureStore();

class App {
  constructor() {

    renderLayout();

    if (module.hot) {
      module.hot.accept('./router', () => {
        AppRouter = require('./router').default;
        renderLayout();
      });
    }
  }
}

function renderLayout() {
  render(
    <AppContainer>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

export default new App();