'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      Board.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })

      Board.hasMany(models.List, {
        foreignKey: 'boardId',
        as: 'lists'
      })
    }
  }
  Board.init({
    title: DataTypes.STRING,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};