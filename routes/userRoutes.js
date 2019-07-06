var db = require("../models");
var passport = require("../config/passport");
var path = require("path");

module.exports = function(app) { 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// User API routes
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	app.post("/api/login", passport.authenticate("local"), function(req, res){

		res.json(req.body)
	});

	app.post("/api/signup", function(req, res){

		db.User.create(req.body).then((data)=>{
			console.log("user creasted");
			// res.redirect("/login")
			res.redirect(307, "/api/login");
		})

			// res.redirect(307, "/api/login")
	});

	app.get("/logout", function(req, res){
		req.logout();
		res.redirect("/");
	});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// User HTML routes
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	app.get("/login", function(req, res){
		if(req.user) {
			// console.log(req.user);
			res.redirect("/");
		}
		res.render("login");
	})
	app.get("/logout", function(req, res){
		req.logout();
		res.redirect("/")
	})


	
}