const path = require('path');

module.exports = {
  entry: {
    main: './src/pages/main.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../public/javascripts'),
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../public'),
    },
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { url: false } },
        'sass-loader',
      ],
    }, {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }],
  },
};
