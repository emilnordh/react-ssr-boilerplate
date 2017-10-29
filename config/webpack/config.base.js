import webpack from 'webpack';
import path from 'path';

export default {
  target: 'web',
  devtool: 'source-map',
  context: path.resolve(__dirname, '..', '..', 'src'),
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist', 'assets'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                'env',
                {
                  useBuiltIns: 'usage',
                },
              ],
              'react',
            ],
            plugins: ['transform-object-rest-spread'],
            env: {
              development: {
                plugins: [
                  'react-hot-loader/babel',
                ],
              },
            },
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'image-webpack-loader',
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[sha512:hash:base64:7].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'],
      filename: '[name].js',
      minChunks: Infinity,
    }),
  ],
}
