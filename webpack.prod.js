const { merge } = require('webpack-merge');
const path = require('path');
const webpackConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

plugins = [
  new MiniCssExtractPlugin({
    filename: '[contenthash].css',
  }),
];

module.exports = merge(webpackConfig, {
  mode: 'production',
  target: 'browserslist',
  plugins,
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[fullhash].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: true,
          output: {
            beautify: true,
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
});
