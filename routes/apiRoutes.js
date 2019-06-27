var db = require("../models");

module.exports = function (app) {

  app.get("/api/recipes", function (_req, res) {
    db.Recipe.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  app.get("/api/recipes/:field/:mode", function (req, res) {

    var field = req.params.field;
    var mode = req.params.mode;

    //field is name of db field
    //field is preferably 'name' or 'rating'
    //mode is either ASC or DESC

    if (!["name", "rating"].includes(field) ||
      !["ASC", "DESC"].includes(mode)) {
      return res.render("404");
    }

    db.Recipe.findAll({

      order: [
        [field, mode]
      ]

    }).then(function (results) {
      res.json(results);
    });

  });

  app.post("/api/recipes", function (req, res) {
    db.Recipe.create(req.body).then(function (results) {
      res.json(results);
    });
  });

  app.put("/api/recipes/:id", function (req, res) {

    var rating = parseInt(req.body.rating);

    var recipeId = parseInt(req.params.id);

    if (isNaN(recipeId)) {
      return res.render("404");
    }

    db.Recipe.findOne({
      where: { id: recipeId }
    })
      .then(function (results) {

        if (!results) {
          return res.render("404");
        }

        db.Recipe.update(
          { rating: results.rating + rating },
          { where: { id: recipeId } },
        )
          .then(function (updateResults) {
            res.json(updateResults);
          });
      });
  });

  app.delete("/api/recipes/:id", function (req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function (results) {
      res.json(results);
    });
  });
};
