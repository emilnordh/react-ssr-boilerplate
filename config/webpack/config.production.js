import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import base from './config.base.js';

export default {
  ...base,
  entry: './client/index.js',
  output: {
    ...base.output,
    filename: '[name].[chunkHash].js',
  },
  module: {
    ...base.module,
    rules: [
      ...base.module.rules,
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]-[local]',
            },
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'resolve-url-loader',
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
        }),
      },
    ],
  },
  plugins: [
    ...base.plugins,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        ie8: false,
        ecma: 5,
        mangle: {
          safari10: true,
        },
        warnings: false,
        output: {
          comments: false,
          beautify: false,
        },
      },
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      asset: '[path].gz',
      algorithm: 'gzip',
      deleteOriginalAssets: false,
    }),
    new ExtractTextPlugin('[name].[chunkHash].css'),
  ],
};
