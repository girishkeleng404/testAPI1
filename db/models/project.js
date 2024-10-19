const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {

  const project = sequelize.define('project', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title cannot be null'
        },
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'isFeatured must be true or false'
        }
      }
    },
    productImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product Image cannot be null'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price cannot be null'
        },
        isDecimal: {
          msg: 'Please enter a valid price'
        }
      }
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Short Description cannot be null'
        },
        notEmpty: {
          msg: 'Short Description cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description cannot be null'
        },
        notEmpty: {
          msg: 'Description cannot be empty'
        }
      }
    },
    productUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product URL cannot be null'
        },
        notEmpty: {
          msg: 'Product URL cannot be empty'
        },
        isUrl: {
          msg: 'Please enter a valid URL'
        }
      }
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category cannot be null'
        },
        notEmpty: {
          msg: 'Category cannot be empty'
        }
      }
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tags cannot be null'
        },
        notEmpty: {
          msg: 'Tags cannot be empty'
        }
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    tableName: 'project'
  });

  // Correct association setup outside define block

  project.associate = (models) => {


    project.belongsTo(models.user, {
      foreignKey: 'createdBy',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    project.hasMany(models.more_data, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };


  return project;

}




