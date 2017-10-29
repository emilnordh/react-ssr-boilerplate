import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import globToRegexp from 'glob-to-regexp';
import clearNodeModuleCache from './lib/clear-node-module-cache';
import webpackConfig from '../../config/webpack/config.babel';

const app = express();
const port = 3000;

const compiler = webpack(webpackConfig);
const options = {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
};

app.use(webpackDevMiddleware(compiler, options));
app.use(webpackHotMiddleware(compiler));

compiler.plugin('done', stats => {
  const filesPath = path.resolve(__dirname, '..');
  clearNodeModuleCache(globToRegexp(`${filesPath}/**`));
});

app.use((request, response) => {
  const createRender = require('./render').default;
  const render = createRender();

  render(request, response);
});

app.listen(port, () => console.log(`Server running on ${port}`));
