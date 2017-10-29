import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer'
import Main from '../components/main';

function render(Component) {
  const rootElement = document.getElementById('app-root');
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement
  );
}

if (process.env.NODE_ENV === 'development') {
  module.hot.accept('../components/main/index.js', () => {
    render(require('../components/main').default);
  });
}

render(Main);

