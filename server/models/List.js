'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      List.belongsTo(models.Board, {
        foreignKey: 'boardId',
        as: 'boards'
      })

      List.hasMany(models.Card, {
        foreignKey: 'listId',
        as: 'cards'
      })
    }
  }
  List.init({
    name: DataTypes.STRING,
    boardId: DataTypes.INTEGER,
    pos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};