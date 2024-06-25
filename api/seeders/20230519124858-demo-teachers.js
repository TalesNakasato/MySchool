'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Teachers', [
      {
        name: 'Pitagoras',
        email: 'pitagoras@pitagoras.com',
        subject: 'Math',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'William Shakespeare',
        email: 'william@william.com',
        subject: 'Literature',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Isac Newton',
        email: 'isac@isac.com',
        subject: 'Physics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teachers', null, {});
  }
};
