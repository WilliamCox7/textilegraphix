const webpack = require('webpack');
const path = require('path');

module.exports = {

  devtool: 'source-map',

  entry: [
    './client/index.js'
  ],

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loaders: [ 'babel-loader']
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ttc|ttf|eot|woff|woff2|mp4)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  resolve: {
    extensions: [".js", ".css"]
  }

}
