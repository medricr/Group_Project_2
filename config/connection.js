var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localHost",
  port: 8080,
  user: "root",
  password: "password",
  database: "recipes_db"
});

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
