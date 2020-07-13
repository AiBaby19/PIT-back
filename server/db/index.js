const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: '123456789',
  user: 'root',
  database: 'pit',
  host: 'localhost',
  port: '3306',
});

const tasks = {};

tasks.all = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM tasks', (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

tasks.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);

      return resolve(results[0]);
    });
  });
};

tasks.post = async ({name, phone, email, date}) => {
    // const transform = (value) => {
    //     return mysql.escape(value);
    // }

  const insertQuery = `INSERT INTO tasks SET 
    name=${name}
    phone=${phone}
    email=${mysql.escape(email)}
    date=${mysql.escape(date)}
    `;


  return new Promise((resolve, reject) => {
    pool.query(insertQuery, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

module.exports = tasks;
