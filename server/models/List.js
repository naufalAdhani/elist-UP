'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      List.belongsTo(models.boards, {
        foreignKey: 'boardId',
        as: 'board'
      })

      List.hasMany(models.cards, {
        foreignKey: 'listId',
        as: 'cards'
      })
    }
  }
  List.init({
    name: DataTypes.STRING,
    boardId: DataTypes.UUID,
    pos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};