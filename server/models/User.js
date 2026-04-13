'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.board, {
        foreignKey: 'userId',
        as: 'boards'
      })

      User.hasMany(models.boardMember, {
        foreignKey: 'userId',
        as: 'boardMembers'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};