'use strict';

const devEnv = process.env.NODE_ENV == 'development';

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

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
  })
];

module.exports = {
  context: __dirname + '/frontend',

  entry: {
    app: ['./app']
  },

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: devEnv ? '[name].js' : '[name].[chunkhash].js'
  },

  watch: devEnv,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: devEnv ? 'inline-source-map' : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 3
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: __dirname + '/build'
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.(njk|nunjucks)$/,
        loader: 'nunjucks-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /\/node_modules\//,
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: devEnv ? 'file?name=fonts/[name].[ext]?[hash]' : 'file?name=fonts/[hash].[ext]'
      }, {
        test: /\.(png|jpg|svg|gif)$/,
        loader: devEnv ? 'file?name=img/[name].[ext]?[hash]' : 'file?name=img/[hash].[ext]'
      }
    ]
  }
};

if (!devEnv) {
  module.exports.plugins.unshift(
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: true
    })
  );
  module.exports.plugins.push(...prodPlugins);
} else {
  module.exports.plugins.push(...devPlugins);
  module.exports.entry.app.unshift('webpack-hot-middleware/client')
}