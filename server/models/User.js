'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Board, {
        foreignKey: 'userId',
        as: 'boards'
      })

      User.hasMany(models.BoardMember, {
        foreignKey: 'userId',
        as: 'boardMembers'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: { type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
     },
    email: { type: DataTypes.STRING,
      allowNull: false,
      unique: true
     },
    password: { type: DataTypes.STRING,
      allowNull: false
     }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true
  });
  return User;
};