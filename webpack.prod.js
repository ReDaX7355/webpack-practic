const { merge } = require('webpack-merge');
const path = require('path');
const webpackConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

plugins = [
  new MiniCssExtractPlugin({
    filename: '[contenthash].css',
  }),
];

module.exports = merge(webpackConfig, {
  mode: 'production',
  target: 'browserslist',
  devtool: false,
  plugins,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[fullhash].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: true,
          output: {
            beautify: false,
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
});
