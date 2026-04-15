'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      Card.belongsTo(models.List, {
        foreignKey: 'listId',
        as: 'list'
      })
    }
  }
  Card.init({
    task: DataTypes.STRING,
    listId: DataTypes.INTEGER,
    pos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};