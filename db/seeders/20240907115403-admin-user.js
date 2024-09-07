module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = 'admin123'
    const hashPassword = bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert('user', [
      {
        userType: '0',
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', {userType:'0'}, {});
  },
};