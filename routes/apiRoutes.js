var db = require("../models");

module.exports = function (app) {

  app.get("/api/recipes", function (req, res) {
    db.Recipe.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  app.get("/api/recipes/:field/:mode", function (req, res) {

    //field is name of db field
    //field is preferably 'name' or 'rating'
    //mode is either ASC or DESC

    db.Recipe.findAll({

      order: [
        [req.params.field, req.params.mode]
      ]

    }).then(function (results) {
      res.json(results);
    })

  });

  // Create a new example
  app.post("/api/recipes", function (req, res) {
    db.Recipe.create(req.body).then(function (results) {
      res.json(results);
    });
  });

  app.put("/api/recipes/:id", function (req, res) {

    //insert error handling if id is not a valid int
    var rating = parseInt(req.body.rating);

    var recipeId = parseInt(req.params.id);

    db.Recipe.findOne({
      where: { id: recipeId }
    })
      .then(function (results) {

        db.Recipe.update(
          { rating: results.rating + rating },
          { where: { id: recipeId } },
        )
          .then(function (updateResults) {
            res.json(updateResults);
          });
      });
  });

  // Delete an example by id
  app.delete("/api/recipes/:id", function (req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function (results) {
      res.json(results);
    });
  });
};
