const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = env => ({
  mode: env === 'production' ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src/app/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  module: {
    rules: [
      {
        test: /.(t|j)s$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.json'],
  },
  plugins: [new NodemonPlugin(), new DotEnv()],
});
