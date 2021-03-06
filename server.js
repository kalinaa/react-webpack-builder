const path = require('path');
const express = require('express');
const Sequelize = require('sequelize');
const models = require('./models');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config');

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

const sequelize = new Sequelize(
  config.db.dbname,
  config.db.username,
  config.db.password,
  {
    dialect: 'postgres',
    host: config.db.host,
    port: config.db.port,
    logging: false,
    timezone: '+05:00'
  }
);

models.init(sequelize);

const app = express();

const api = require('./routes/api');

const devEnv = app.get('env') === 'development';

app.set('port', port);
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//routes
app.use('/api', api);

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
  app.use(require('webpack-hot-middleware')(compiler));

  app.use(morgan('dev'));

  app.get('*', (req, res, next) => {
    let filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
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

// error handlers

// development error handler
// will print stacktrace
if (devEnv) {
  app.use((err, req, res) => {
    if (err) console.log(err);
  });
}

app.listen(port, host, error => {
  if (error) {
    console.log(error)
  } else {
    console.log(`Express listening on ${host}:${port}`)
  }
});
