module.exports = function (sequelize, DataTypes) {
  const Stock = sequelize.define('Stock', {
    stock_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    buying_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_gain: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_sold: {
      type: DataTypes.INTEGER,
      default: 0
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Stock.associate = function (models) {
    Stock.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Stock.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Stock;
};