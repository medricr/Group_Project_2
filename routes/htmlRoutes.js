var db = require("../models");
var path = require("path");

module.exports = function (app) {

  app.get("/", function (_req, res) {
    res.sendFile(path.join(__dirname, "/../html/home.html"));
  });

  app.get("/post", function (_req, res) {
    res.sendFile(path.join(__dirname, "/../html/post.html"));
  });

  app.get("/display/:field/:mode", function (req, res) {

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

    }).then(function (recipes) {
      res.render("display", { recipes: recipes });
    });


  });

  // Render 404 page for any unmatched routes
  app.get("*", function (_req, res) {
    res.render("404");
  });
};
