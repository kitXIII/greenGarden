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
        test: /\.html$/,
        use: 'html-loader',
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
      {
        test: /\.(gif|png|jpeg)$/i, // use jpeg instead of jpg because extension is used in mimetype
        use: [
          'url-loader?limit=8192&mimetype=image/[ext]&name=./images/[name].[ext]',
          // {
          //    loader: 'file-loader',
          //    options: {
          //      name: '[name].[ext]',
          //      outputPath: 'images/',
          //      publicPath: '../images/',
          //     },
          // },
          {
            loader: 'image-webpack-loader',
            options: devMode ? {} : {
              mozjpeg: {
                progressive: true,
                quality: 70,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '70-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.sass', '.scss', '.css'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: './css/[id].css',
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
