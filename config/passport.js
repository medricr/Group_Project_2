var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");


passport.use(new LocalStrategy(
	{
		usernameField: "username"
	},
	function(username, password, done){

		// Function for retrieving user data from the table based on username, so the account can be validated
		db.User.findOne({
			where: {
				username: username
			}
		}).then(function(dbUser){

			// Checks if the user has input a username that exists, then checks if the password for that account is correct
			if (!dbUser){
				return done(null,false, {
					message: "Incorrect username"
				});
			}
			else if (!dbUser.validPassword(password)){
				return done(null,false, {
					message: "Incorrect password"
				})
			}

			return done(null, dbUser);
		});
	}
));

// Attaches the user profile to the request, enabling access to the user data on any route
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

// Detaches the user profile tot he request, disabling access to the user data
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;