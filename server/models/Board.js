'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      Board.belongsTo(models.userId, {
        foreignKey: 'userId',
        as: 'user'
      })

      Board.hasMany(models.list, {
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