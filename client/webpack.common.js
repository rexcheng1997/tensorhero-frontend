const path = require('path');

module.exports = {
  entry: {
    landing: './src/pages/landing/index.tsx',
    generateCHLevel: './src/pages/generate-ch-level/index.tsx',
    technicalStuff: './src/pages/technical-stuff/index.tsx',
    charts: './src/pages/charts/index.tsx',
    chartVizDemo: './src/pages/chart-viz-demo/index.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../public/javascripts'),
    publicPath: '/javascripts/',
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../public'),
      config: path.resolve(__dirname, 'src/config'),
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
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
