'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Classes', [
      {
        name: 'Math',
        teacher_id: 1,
        student_id: 37,
        level_id: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Math',
        teacher_id: 1,
        student_id: 37,
        level_id: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Math',
        teacher_id: 1,
        student_id: 37,
        level_id: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Literature',
        teacher_id: 2,
        student_id: 37,
        level_id: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Literature',
        teacher_id: 2,
        student_id: 37,
        level_id: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Literature',
        teacher_id: 2,
        student_id: 37,
        level_id: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Physics',
        teacher_id: 3,
        student_id: 37,
        level_id: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Physics',
        teacher_id: 3,
        student_id: 37,
        level_id: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Physics',
        teacher_id: 3,
        student_id: 37,
        level_id: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {});
  }
};