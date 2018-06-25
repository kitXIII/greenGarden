const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const MqPacker = require('css-mqpacker');

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  const conf = {
    entry: {
      vendors: './src/vendors.js',
      main: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: './js/[name].js',
      // publicPath: 'dist/',
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
            : [
              MiniCssExtractPlugin.loader,
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
          test: /\.(woff|woff2)$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]',
        },
        {
          test: /\.ttf$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./fonts/[name].[ext]',
        },
        {
          test: /\.eot$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./fonts/[name].[ext]',
        },
        {
          test: /\.svg$/,
          loader: 'url-loader?limit=10000&mimetype=application/svg+xml&name=./fonts/[name].[ext]',
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

  return conf;
};
