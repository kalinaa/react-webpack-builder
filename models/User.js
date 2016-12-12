module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.fn('uuid_generate_v4')
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
      // required: true,
      // trim: true
    },
    nickname: {
      type: DataTypes.STRING
      // required: true,
      // trim: true
    }
  }, {
    tableName: 'users',
    underscored: true
    // getterMethods: {
    //   full_name: function() {
    //     return `${this.first_name} ${this.last_name}`
    //   }
    // }
  });
};
