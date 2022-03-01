const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '/../public'),
    watchContentBase: true,
    publicPath: path.resolve(__dirname, '/../public/javascripts'),
    compress: true,
    port: 3000,
    watchOptions: {
      aggregateTime: 500,
      poll: 2000,
      ignored: /node_modules/,
    },
  },
});
