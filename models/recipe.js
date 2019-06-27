module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    steps: DataTypes.TEXT,
    ingredients: DataTypes.TEXT
  });
  return Recipe;
};
