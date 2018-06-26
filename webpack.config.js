const path = require('path');
const yargs = require('yargs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const MqPacker = require('css-mqpacker');

const devMode = yargs.argv.mode !== 'production';

const conf = {
  entry: {
    vendors: './src/vendors.js',
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    // publicPath: '../',
  },
  devServer: {
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: '/node_modules',
      },
      {
        test: /\.min\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: devMode
          ? ['style-loader', 'css-loader', 'sass-loader']
          : [MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  Autoprefixer,
                  MqPacker,
                ],
              },
            },
            'sass-loader',
          ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '../fonts/',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.sass', '.scss', '.css'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? './css/[name].css' : './css/[name].[hash].css',
      chunkFilename: devMode ? './css/[id].css' : './css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: path.join(__dirname, 'dist', 'index.html'),
    }),
    new CleanWebpackPlugin(['dist']),
  ],
  devtool: devMode && 'eval-sourcemap',
};

module.exports = conf;
