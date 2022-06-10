const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: '../src/index.js',
  devServer: {
    hot: true,
    open:true,
    host:'localhost',
    port:8080
  },
  optimization: {
    moduleIds: 'named'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),//根目录
      verbose:  true,//开启在控制台输出信息
    }),
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: '../index.html',
        inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};