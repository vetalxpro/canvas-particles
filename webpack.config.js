const webpack = require('webpack');
const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    main: ['./main.ts']
  },
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CheckerPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Canvas Test',
      template: path.join(__dirname, './src/html/index.html')
    })
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, './src'),
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './public'),
    compress: false,
    port: 3000,
    historyApiFallback: true,
    watchContentBase: true
  }
};

module.exports = config;