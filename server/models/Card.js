'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      Card.belongsTo(models.lists, {
        foreignKey: 'listId',
        as: 'list'
      })
    }
  }
  Card.init({
    task: DataTypes.STRING,
    listId: DataTypes.UUID,
    pos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};