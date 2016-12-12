const express = require('express');
const router = express.Router({});
// const sequelize = require('sequelize');
// const models = require('../models');

// const User = models.User;

router.get('/user', (req, res, next) => {

  res.send({
    "nickname" : "admin"
  });

  // User.findAll({
  //   where: {
  //     email: 'admin@email.ru'
  //   }
  // })
  // .then(user => res.send(user[0].toJSON()))
  // .catch(next);
});

module.exports = router;