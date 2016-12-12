const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// const config = require('./config');

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const app = express();

const devEnv = app.get('env') === 'development';

app.set('port', port);
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

if (devEnv) {
  app.set('view cache', false);
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./webpack.config');
  const compilerConfig = {
    hot: true,
    stats: {
      colors: true
    },
    publicPath: '/'
  };
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, compilerConfig));
  app.use(require("webpack-hot-middleware")(compiler));

  app.use(morgan('dev'));

  app.get('*', (req, res) => {
    let filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });

} else {
  app.set('view cache', true);
  app.use('/', express.static(path.join(__dirname, '/build'))); // todo: переделать на nginx
  app.use(morgan('combined', {
    skip: (req, res) => {
      return res.statusCode < 400;
    }
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });
}

app.listen(port, host, () => {
  console.log(`Express listening on ${host}:${port}`)
});
