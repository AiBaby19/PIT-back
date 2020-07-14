require('dotenv').config();
export {};

const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 10,
  password: 'JVUy&nr0en%',
  user: 'admin',
  database: 'pit',
  host: 'database-aws.ca6u1sz8llmi.eu-west-1.rds.amazonaws.com',
  port: '3306',

  // connectionLimit: process.env.CONNECTION_LIMIT,
  // password: process.env.PASSWORD,
  // user: 'root',
  // database: process.env.DB,
  // host: process.env.HOST,
  // port: process.env.PORT,
});

module.exports = db;