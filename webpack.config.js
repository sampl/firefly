// This file tells webpack to bundle all files that /source/app.js imports and spit out the result in /build/app.js
// Learn more here: https://webpack.js.org/guides/getting-started/

var path = require('path')

module.exports = {
  entry: './source/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
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
