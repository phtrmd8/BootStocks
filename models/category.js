module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 64]
      }
    }
  });

  Category.associate = function(models) {
    Category.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Category.hasMany(models.Stock, {
      onDelete: "cascade"
    });
  };

  return Category;
};
