'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Students', [
      {
        name: 'Tales Nakasato',
        active: true,
        email: 'tales@tales.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Michael Jackson',
        active: true,
        email: 'michael@michael.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lebron James',
        active: true,
        email: 'lebron@lebron.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Neymar Jr',
        active: true,
        email: 'neymar@neymar.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brad Pitt',
        active: true,
        email: 'brad@brad.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students', null, {});
  }
};
