const config = require('./config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.db.dbname,
  config.db.username,
  config.db.password, {
    dialect: 'postgres',
    host: config.db.host,
    port: config.db.port,
    define: {
      underscored: true
    }
  });

const models = require('./models');

models.init(sequelize);

const User = models.User;

sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
.then(() =>
  sequelize.sync({
    force: true
  })
  .then(() => {
    User.create({
      email: 'admin@email.ru',
      nickname: 'AdminNickname'
    })
  })
);

