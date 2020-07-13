const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 10,
  password: '123456789',
  user: 'root',
  database: 'pit',
  host: 'localhost',
  port: '3306',
});

const tasks = {};

tasks.all = () => {
  const getAllTasks = 'SELECT * FROM tasks';

  return new Promise((resolve, reject) => {
    db.query(getAllTasks, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

tasks.one = (id) => {
  const getTask = 'SELECT * FROM tasks WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.query(getTask, [id], (err, results) => {
      if (err) return reject(err);

      return resolve(results[0]);
    });
  });
};

tasks.post = async ({ name, phone, email, date }) => {
    console.log(name, phone, email, date)
  const insertTask =
    'INSERT INTO tasks(name, phone, email, date) values(?, ?, ?, ?)';

  const values = [name, phone, email, date];

  return new Promise((resolve, reject) => {
    db.query(insertTask, values, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

tasks.delete = async (id) => {
  const deleteTask = 'DELETE FROM tasks WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.query(deleteTask, id, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

tasks.put = async ({ name, phone, email, date }, id) => {
  const updateTask =
    'UPDATE tasks SET name = ?, phone = ?, email = ?, date = ?  WHERE id = ?';

  const values = [name, phone, email, date, id];

  return new Promise((resolve, reject) => {
    db.query(updateTask, values, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

module.exports = tasks;
