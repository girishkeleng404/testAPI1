const { DataTypes } = require("sequelize");
// const Project = require("./project");

module.exports = (sequelize) => {
  const more_data = sequelize.define('more_data', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'project', // Removed extra space
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    moreData_1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    moreData_2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt:{
      type: DataTypes.DATE,
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    tableName: 'more_data', // Table name as a string
    timestamps: true
  });

  // Correct belongsTo association

  more_data.associate = (models) => {

    more_data.belongsTo(models.project, {
      foreignKey: 'product_id',
      paranoid: true,
    });
  }

  return more_data;
};
