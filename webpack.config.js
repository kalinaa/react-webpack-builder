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
      // don't show unreachable variables etc
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
    // common: './common'                           // можно вручную задать в этом файле подключение все общие модули +
  },                                                // в него CommonsChunkPlugin добавить свои результаты

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: devEnv ? '[name].js' : '[name].[chunkhash].js'               // chunkhash как способ версионирования
    // library: '[name]'                                                   // записывает собранные файлы, как
  },                                                                       // библиотеки в глобальные переменные

  watch: devEnv,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: devEnv ? 'inline-source-map' : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({                      // Передаем любые значение в сборку (ex:NODE_ENV)
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({       // Выносит модули импортированные в нескольких файлов в отдельный модуль
      name: 'common',                               // Можно использовать несколько раз и явно указать из каких модулей
      minChunks: 3                                  // в какой файл выносить
    }),
    new AssetsPlugin({                              // создает список фойлов с путями для каждой точки входа,
      filename: 'assets.json',                      // которые можно использовать в темплейтах для версионирования.
      path: __dirname + '/build'                    // Если нет темплейтов можно использовать HtmlWebpackPlugin
    })
    // new webpack.ProvidePlugin({                  // экспортирует содержимое библиотек из nodemodules в глобальные
    //  React: 'react'                              // переменные, в данном примере react, если бы он был подключен
    // })
  ],

  resolve: {                                        // Правила подключени и поиска модулей
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  resolveLoader: {                                  // Правила подключени и поиска лоадеров
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
        test: /\.(njk|nunjucks)$/,
        loader: 'nunjucks-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /\/node_modules\//,
        query: {
          presets: ['es2015', 'react']
          // plugins: ['transform-runtime']   // todo: проверить большой бандл с этой опцией, должен выносить
        }                                     // вспомогательные функции в отдельные модули, а не дублировать их в коде
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: devEnv ? 'file?name=fonts/[name].[ext]?[hash]' : 'file?name=fonts/[hash].[ext]'
      }, {
        test: /\.(png|jpg|svg|gif)$/,
        loader: devEnv ? 'file?name=img/[name].[ext]?[hash]' : 'file?name=img/[hash].[ext]'
      }]
    // noParse: /angular\/angular\.js/        // не парсит файлы на require, полезно для библиотек,
  }                                           // состоящих из одного общего файла, без зависимостей
};

if (!devEnv) {
  module.exports.plugins.unshift(
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: true
      // exclude: ['index.html']
    })
  );
  module.exports.plugins.push(...prodPlugins);
} else {
  module.exports.plugins.push(...devPlugins);
  module.exports.entry.app.unshift('webpack-hot-middleware/client');
}