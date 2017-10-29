import webpack from 'webpack';
import base from './config.base.js';

export default {
  ...base,
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    './client/index.js',
  ],
  output: {
    ...base.output,
    filename: '[name].js',
    pathinfo: true,
  },
  module: {
    ...base.module,
    rules: [
      ...base.module.rules,
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: '[name]-[local]',
          },
        }, {
          loader: 'resolve-url-loader',
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }]
      }
    ],
  },
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
