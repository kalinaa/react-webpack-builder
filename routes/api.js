const express = require('express');
const router = express.Router({});
const models = require('../models');

const User = models.User;

router.get('/user', (req, res, next) => {
  User.findOne({
    where: {
      email: 'admin@email.ru'
    }
  })
  .then(user => res.send(user.toJSON()))
  .catch(next);
});

router.post('/user/update', (req, res, next) => {
  User.findById(req.body.userId)
  .then(user => {
    user.nickname = req.body.nickname;
    user.save()
    .then(updatedUser => {
      res.send(updatedUser);
    });
  })
  .catch(next);
});

module.exports = router;