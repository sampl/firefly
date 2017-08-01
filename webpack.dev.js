// This file tells webpack to bundle all files that /client/app.js imports and spit out the result in /build/app.js
// Learn more here: https://webpack.js.org/guides/getting-started/

let path = require('path')
let webpack = require('webpack')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')

let algoliaConfig = require('./config/algolia-config.json')
let firebaseClientConfig = require('./config/firebase-config-dev.json')

module.exports = {
  entry: './client/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      ALGOLIA: JSON.stringify(algoliaConfig),
      FIREBASE: JSON.stringify(firebaseClientConfig),
    }),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './client/index.html',
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
