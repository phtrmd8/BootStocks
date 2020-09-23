<<<<<<< HEAD
module.exports = function(sequelize,DataTypes){
  return {}
}
=======
module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 64]
      }
    }
  });

  Category.associate = function (models) {
    Category.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Category;
};
>>>>>>> 9bcb067596255db664973ebfc85acbcb406c8252
