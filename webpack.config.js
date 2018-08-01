var webpack = require('webpack');
var path = require('path');
var config = require('./config');

let plugins = [];
if (config.env === 'production') {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  }));
}
plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env),
    'HOST': JSON.stringify(config.host)
  }
}));

module.exports = {

  devtool: 'source-map',

  entry: [
    './client/index.js'
  ],

  output: {
    path: path.join(__dirname, '/build'),
    filename: "bundle.js",
    publicPath: '/'
  },

  plugins: plugins,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loaders: [ 'babel']
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
        test: /\.(ttc|ttf|eot|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
  },

  resolve: {
    extensions: ["", ".js", ".css"]
  }

}
