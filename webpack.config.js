const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = [
  {
    test: /\.[jt]sx?$/i,
    exclude: '/node_modules/',
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  },
  {
    test: /\.(s[ac]|c)ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {
                  // Options
                },
              ],
            ],
          },
        },
      },
    ],
  },
  {
    test: /\.(s[ac])ss$/i,
    use: ['sass-loader'],
  },
  {
    test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/img/[hash][ext]',
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/i,
    exclude: '/node_modules/',
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[hash][ext]',
    },
  },
];

module.exports = {
  entry: {
    index: {
      import: path.resolve(__dirname, './src/index.tsx'),
    },
  },
  devtool: 'inline-source-map',
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching',
      minify: false,
      hash: true,
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    clean: true,
  },
  module: {
    rules,
  },
};
