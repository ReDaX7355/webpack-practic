const { merge } = require('webpack-merge');
const path = require('path');
const webpackConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
];

module.exports = merge(webpackConfig, {
  mode: 'development',
  target: 'web',
  plugins,
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
  },
});
