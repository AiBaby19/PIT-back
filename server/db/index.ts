export {};

const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: process.env.CONNECTION_LIMIT,
  password: process.env.PASSWORD,
  user: process.env.USER,
  database: process.env.DB,
  host: process.env.HOST,
  port: process.env.PORT,
});

module.exports = db;
