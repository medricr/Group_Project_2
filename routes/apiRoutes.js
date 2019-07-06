var db = require("../models");
var blobUtil = require("blob-util");

module.exports = function (app) {


  app.get("/api/user/test", function (req, res) {
    if (req.user) {
      res.json(req.user)
      // return true;
    }
    else {
      res.json("no user is signed in")
      // return false;
    }
  })


  app.post("/submit/photo", function (req, res) {

    db.Picture.create({
      type: "test",
      name: "test",
      data: req.body.data,
      RecipeId: req.body.recipe_id
    }).then(function (data) {
      res.json(data);
    })


  });

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
      ],

      include: [db.Picture]

    }).then(function (results) {
      res.json(results);
    });

  });

  app.post("/api/recipes", function (req, res) {
    // console.log(req);
    // console.log(req.user);
    if (req.user == undefined) {
      console.log("you must be signed in to post");
      return;
    }
    else {
      db.Recipe.create(req.body).then(function (results) {
        res.json(results);
      });
    }
  });

  app.put("/api/recipes/:id/like", function (req, res) {

    var recipeId = parseInt(req.params.id);

    if (isNaN(recipeId)) {
      return res.render("404");
    }

    db.Recipe.findOne({
      where: { id: recipeId }
    }).then(function (results) {

      if (!results) {
        return res.render("404");
      }

      db.Recipe.update(
        { rating: results.rating + 1 },
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
