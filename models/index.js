module.exports.init = (sequelize) => {
  const User = sequelize.import('User');

  //relations

  //export models
  module.exports.User = User;

  // export connection
  module.exports.sequelize = sequelize;
};