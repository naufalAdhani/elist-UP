'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {

    // generate ID & hash pw
    const userId = uuidv4();
    const boardId = uuidv4();
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('123456', 10);

    // insert user
    await queryInterface.bulkInsert('users', [
      {
        id: userId,
        name: 'dummy',
        email: 'dummy123@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // insert board pakai userId yg sama
    await queryInterface.bulkInsert('boards', [
      {
        id: boardId,
        title: 'Project Board',
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('boards', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};