const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '..', 'public'),
      serveIndex: true,
    },
    watchFiles: [
      path.resolve(__dirname, 'src/**/*'),
      path.join(__dirname, '..', 'public/**/*'),
    ],
    compress: true,
    port: 3000,
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 2000,
    ignored: /node_modules/,
  },
});
