var db = require("../models");
module.exports = function (app) {

  //this will render the home page
  app.get("/", function (_req, res) {

	
    res.render("index");
  });

  //this will render the form page
  app.get("/form", function (_req, res) {
	if(_req.user == undefined){
		res.render("login");
	}
	else{
		res.render("form");
	}
    // res.render("form");
  });
  app.get("/login", function (_req, res) {
    res.render("login");
  });
  app.get("/signup", function (_req, res) {
    res.render("signup");
  });
  app.get("/browse", function (_req, res) {
	  db.Recipe.findAll({

    //   order: [
    //     [field, mode]
    //   ],
      include: [db.Picture]

    }).then(function (recipes) {

      res.render("display", { recipes: recipes });
    });

	// db.Picture.findAll().then(function(data){
	// 	res.render("display", {data: data})
	// })
  })



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
      ],
      include: [db.Picture]

    }).then(function (recipes) {

      res.render("display", { recipes: recipes });
    });


  });

};
