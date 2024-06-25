'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      level_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Levels', key: 'id'}
      },
      student_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {model: 'Students', key: 'id'}
      },
      teacher_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Teachers', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Classes');
  }
};