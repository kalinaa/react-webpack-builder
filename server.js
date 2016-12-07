const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// const config = require('./config')

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const app = express();

const devEnv = app.get('env') === 'development';

let assetsPaths = '';

app.set('port', port);
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// view engine setup
app.set('view engine', 'njk');

nunjucks.configure(['views', 'public'], {
  noCache: devEnv,
  autoescape: true,
  express: app
});

if (devEnv) {
  app.set('view cache', false);
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./webpack.config');
  const compilerConfig = {
    noInfo: false,
    lazy: false,
    publicPath: webpackConfig.output.publicPath
  };
  const compiler = webpack(webpackConfig);
  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, compilerConfig);

  app.use(webpackDevMiddlewareInstance);
  app.use(require("webpack-hot-middleware")(compiler));
  webpackDevMiddlewareInstance.waitUntilValid(() => {
    assetsPaths = require(path.join(__dirname, '/build/assets.json'));
  });

  app.use(morgan('dev'));
} else {
  app.set('view cache', true);
  app.use('/', express.static(path.join(__dirname, '/build'))); // todo: переделать на nginx
  app.use(morgan('combined', {
    skip: (req, res) => {
      return res.statusCode < 400;
    }
  }));
  assetsPaths = require(path.join(__dirname, '/build/assets.json'));
}

// routes
app.get('*', (req, res) => {
  res.render('index', assetsPaths)
});

app.listen(port, host, () => {
  console.log(`Express listening on ${host}:${port}`)
});
