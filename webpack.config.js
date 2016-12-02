'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  context: __dirname + '/frontend',

  entry: {
    app: './app'
    // common: './common'                           // можно вручную задать в этом файле подключение все общие модули +
                                                    // в него CommonsChunkPlugin добавить свои результаты
  },

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].js',
    // library: '[name]'                            // записывает собранные файлы, как библиотеки в глобальные
                                                    // переменные
  },

  watch: NODE_ENV == 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? 'inline-source-map' : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({                      // Передаем любые значение в сборку (ex:NODE_ENV)
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({       // Выносит модули импортированные в нескольких файлов в отдельный модуль
      name: 'common',                               // Можно использовать несколько раз и явно указать из каких модулей
      minChunks: 3                                  // в какой фалй выносить
    }),
    // new webpack.ProvidePlugin({                  // экспортирует содержимое библиотек из nodemodules в глобальные переменные
    //   React: 'react'                             // в данном примере react, если бы он был подключен
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
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /\/node_modules\//,
        query: {
          presets: ['es2015']
          // plugins: ['transform-runtime']   // todo: проверить большой бандл с этой опцией, должен выносить
                                              // вспомогательные функции в отдельные модули, а не дублировать их в коде
        }
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file?name=fonts/[hash].[ext]'
      }, {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file?name=img/[hash].[ext]'
      }
    ]
    // noParse: /angular\/angular\.js/        // не парсит файлы на require, полезно для библиотек,
                                              // состоящих из одного общего файла, без зависимостей
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