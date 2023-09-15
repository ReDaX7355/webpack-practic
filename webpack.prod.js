const { merge } = require('webpack-merge');
const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
});
