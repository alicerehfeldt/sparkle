var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  entry: {
    init: './src/sparkle.js'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'Sparkle'
  },
  module: {
    wrappedContextCritical: false,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel', 
        query: {
          presets: ['es2015']
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "SparkleJS test page",
      favicon: '',
      inject: 'head',
      template: 'index.ejs'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]

}
