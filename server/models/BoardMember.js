'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardMember extends Model {
      static associate(models) {
        BoardMember.belongsTo(models.Board, {
          
        })
    }
  }
  BoardMember.init({
    userId: DataTypes.UUID,
    boardId: DataTypes.UUID,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BoardMember',
  });
  return BoardMember;
};