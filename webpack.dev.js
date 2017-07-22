// This file tells webpack to bundle all files that /source/app.js imports and spit out the result in /build/app.js
// Learn more here: https://webpack.js.org/guides/getting-started/

var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var algoliaConfig = require('./config/algolia-config.json')
var firebaseClientConfig = require('./config/firebase-config-dev.json')

module.exports = {
  entry: './source/app.js',
  output: {
    filename: 'app-[hash].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      ALGOLIA: JSON.stringify(algoliaConfig),
      FIREBASE: JSON.stringify(firebaseClientConfig),
    }),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './source/index.html',
      hash: true,
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
