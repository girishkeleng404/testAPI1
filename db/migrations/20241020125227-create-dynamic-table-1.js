'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dynamicTable1', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'project',
          key: 'id'
        }
      },
      country:{
        type: Sequelize.STRING,
        allowNull: false
      },
      state:{
        type: Sequelize.STRING,
        allowNull: false
      },
      city:{
        type: Sequelize.STRING,
        allowNull: false
      },
      pincode:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
      description:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dynamicTable1');
  }
};