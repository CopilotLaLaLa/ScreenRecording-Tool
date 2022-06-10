'use strict'
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const base = require('./webpack.base.config.js');
module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open:true,
    host:'localhost',
    port:8080,
  },
});