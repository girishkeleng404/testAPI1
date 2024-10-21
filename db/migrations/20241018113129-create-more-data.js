'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('more_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER, 
        references:{
          model: 'project',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      moreData_1:{
        type: Sequelize.STRING,
        allowNull: true,
    
      },
      moreData_2:{
        type: Sequelize.STRING,
        allowNull:false,
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
        
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('more_data');
  }
};