'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  entry: "./home",
  output: {
    filename: "build.js"
  },
  watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: NODE_ENV == 'development' ? 'inline-source-map' : null,

  plugins: [
    new webpack.DefinePlugin({                      // Передаем любые значение в сборку (ex:NODE_ENV)
      NODE_ENV: JSON.stringify(NODE_ENV)
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
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
          // plugins: ['transform-runtime']   //todo: проверить большой бандл с этой опцией, должен выносить
          // вспомогательные функции в отдельные модули, а не дублировать их в коде

        }
      }
    ]
  }
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // don't show unreachable variables etc
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}