const express = require('express');
const router = express.Router({});
const models = require('../models');

const User = models.User;

router.get('/user', (req, res, next) => {

  // res.send({
  //   "nickname" : "admin"
  // });

  User.findOne({
    where: {
      email: 'admin@email.ru'
    }
  })
  .then(user => res.send(user.toJSON()))
  .catch(next);
});

module.exports = router;