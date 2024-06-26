'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Students.hasMany(models.Classes, {
        foreignKey: 'student_id'
      })
      Students.hasMany(models.Registrations, {
        foreignKey: 'student_id'
      })
    }
  }
  Students.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Students;
};