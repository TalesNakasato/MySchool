'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registrations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Registrations.belongsTo(models.Students, {
        foreignKey: 'student_id'
      })
      Registrations.belongsTo(models.Classes, {
        foreignKey: 'class_id'
      })
    }
  }
  Registrations.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Registrations',
  });
  return Registrations;
};