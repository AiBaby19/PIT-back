import Task from '../interfaces/Task';
const db = require('./index');

interface DB {
  all: () => void;
  byUser: (user: any) => void;
  one: (id: number) => void;
  post: (task: Task) => void;
  delete: (id: number) => void;
  put: (task: Task, id: number) => void;
}

// @ts-ignore
const tasks: DB = {};

tasks.all = () => {
  const getAllTasks = 'SELECT * FROM tasks';
  
  return new Promise((resolve, reject) => {
    db.query(getAllTasks, (err: any, results: any) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

tasks.byUser = (user: any) => {
  const getUserTasks = 'SELECT * FROM tasks WHERE user = ?';
  
  return new Promise((resolve, reject) => {
    db.query(getUserTasks, user, (err: any, results: any) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

tasks.one = (id: number) => {
  console.log(id)
  const getTask = 'SELECT * FROM tasks WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.query(getTask, [id], (err: any, results: any) => {
      if (err) return reject(err);

      return resolve(results[0]);
    });
  });
};

tasks.post = async ({ user ,name, phone, email, date }: Task) => {
  const insertTask =
    'INSERT INTO tasks(user, name, phone, email, date) values(?, ?, ?, ?, ?)';

  const values = [user, name, phone, email, date];

  return new Promise((resolve, reject) => {
    db.query(insertTask, values, (err: any, results: any) => {
      if (err) return reject(err);
    
      return resolve(results);
    });
  });
};

tasks.delete = async (id: number) => {
  const deleteTask = 'DELETE FROM tasks WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.query(deleteTask, id, (err: any, results: any) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

tasks.put = async ({ name, phone, email, date }: Task, id: number) => {
  const updateTask =
    'UPDATE tasks SET name = ?, phone = ?, email = ?, date = ?  WHERE id = ?';

  const values = [name, phone, email, date, id];

  return new Promise((resolve, reject) => {
    db.query(updateTask, values, (err: any, results: any) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

module.exports = tasks;
