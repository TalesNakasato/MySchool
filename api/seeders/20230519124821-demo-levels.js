'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Levels', [
      {
        level: 'Beginner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'intermediate',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'Advanced',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Levels', null, {});
  }
};
