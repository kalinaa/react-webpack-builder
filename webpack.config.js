'use strict';

const isProduction = process.env.NODE_ENV == 'production';

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let entry = {
  app: ['./app']
};

let loaders = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /\/node_modules\//,
    query: {
      plugins: ["transform-decorators-legacy"],
      presets: ['es2015', 'react', 'stage-0']
    }
  }
  // {
  //   test: /\.css$/,
  //   loader: 'style!css'
  // }, {
  //   test: /\.(ttf|eot|woff|woff2)$/,
  //   loader: isProduction ? 'file?name=fonts/[hash].[ext]' : 'file?name=fonts/[name].[ext]?[hash]'
  // }, {
  //   test: /\.(png|jpg|svg|gif)$/,
  //   loader: isProduction ? 'file?name=img/[hash].[ext]' : 'file?name=img/[name].[ext]?[hash]'
  // }
];

let plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }),
  new HtmlWebpackPlugin({
    template: '../index.html',
    minify: {
      removeComments: isProduction,
      collapseWhitespace: isProduction
    },
    inject: true
  }),
  new webpack.ProvidePlugin({
    'React': 'react'
  })
];

const devPlugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin()
];
const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      unsafe: true
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: 3
  })
];

if (isProduction) {
  plugins.unshift(
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: true
    })
  );
  plugins.push(...prodPlugins);
} else {
  plugins.push(...devPlugins);
  entry.app.unshift('webpack-hot-middleware/client', 'react-hot-loader/patch')
}

module.exports = {
  context: __dirname + '/frontend',

  entry: entry,

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js'
  },

  watch: !isProduction,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: isProduction ? null : 'inline-source-map',

  plugins: plugins,

  resolve: {
    modulesDirectories: ['node_modules', './components', './containers'],
    extensions: ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: loaders
  }
};