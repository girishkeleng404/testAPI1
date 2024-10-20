'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const dynamicTable1 = sequelize.define('dynamicTable1', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'project',
        key: 'id'
      },
      validate: {
        notNull: {
          msg: 'the product id can not be null'
        },
        notEmpty: {
          msg: 'the product id can not be empty'
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'the country can not be null'
        },
        notEmpty: {
          msg: 'the country can not be empty'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'the state can not be null'
        },
        notEmpty: {
          msg: 'the state can not be empty'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'the city can not be null'
        },
        notEmpty: {
          msg: 'the city can not be empty'
        }
      }
    },
    pincode: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'the pincode id can not be null'
        },
        notEmpty: {
          msg: 'the pincode can not be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'the description can not be null'
        },
        notEmpty: {
          msg: 'the description can not be empty'
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE,
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    tableName: 'dynamicTable1',
    timestamps: true
  })


  dynamicTable1.associate = (models) => {
    dynamicTable1.belongsTo(models.project, {
      foreignKey: 'product_id'
    })
  }


  return dynamicTable1;
}