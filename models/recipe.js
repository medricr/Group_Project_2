module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    steps: DataTypes.TEXT,
    ingredients: DataTypes.TEXT
  });

  Recipe.associate = function (models) {
    Recipe.hasOne(models.Picture, {
      onDelete: "cascade"
    });
  };

  return Recipe;
};
