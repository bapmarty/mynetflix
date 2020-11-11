/**
 * @desc Export mysql environment variables.
 */

module.exports = {
  HOST: process.env.MYSQL_DB_HOST,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DATABASE
}