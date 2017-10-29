import React from 'react';
import { renderToString } from 'react-dom/server';
import Main from '../components/main';

export default ({ clientStats } = {}) => (request, response) => {
  const app = renderToString(<Main />);

  response.send(`
    <!doctype html>
    <html>
      <head>
        <title></title>
      </head>
      <body>
        <div id="app-root">${app}</div>
        <script src="/bootstrap.js"></script>
        <script src="/main.js"></script>
      </body>
    </html>
  `);
};
