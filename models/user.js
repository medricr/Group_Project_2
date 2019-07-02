// required for password hashing
var bcrypt = require("bcrypt");
// create model for the user
module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User",{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	// Function whih compares the passowrd input to the stored password
	User.prototype.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};

	// Hash the password so it is more secure
	User.addHook("beforeCreate", (user)=>{
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
	});

	return User;
};