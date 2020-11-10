const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

/**
 * @desc Create MySQL database connection.
 * @param
 *  string - host - database host url
 *  string - user - username connection
 *  string - password - user password
 *  string - database - database name
 * 
 */

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  insecureAuth: true
});

/**
 * @desc Connect api to the database and
 * write message in the console.
 */

connection.connect(err => {
  if (err) throw err;
  console.log("Successfully connected to the database.");
});

module.exports = connection;