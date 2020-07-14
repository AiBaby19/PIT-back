import {User} from '../interfaces/User';
const db = require('./index');

interface DB {
  getLoginToken: (password: string) => void;
  register: (user: User) => void;
}

// @ts-ignore
const user: DB = {};

// user.getLoginToken = (id: number) => {
//   const getTask = 'SELECT * FROM tasks WHERE id = ?';

//   return new Promise((resolve, reject) => {
//     db.query(getTask, [id], (err: any, results: any) => {
//       if (err) return reject(err);

//       return resolve(results[0]);
//     });
//   });
// };

user.register = async ({ email, password, isAdmin }: User) => {
    console.log(email)
  const insertUser =
    'INSERT INTO users(email, password, isAdmin) values(?, ?, ?)';

  const values = [email, password, isAdmin];

  return new Promise((resolve, reject) => {
    db.query(insertUser, values, (err: any, results: any) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

// tasks.delete = async (id: number) => {
//   const deleteTask = 'DELETE FROM tasks WHERE id = ?';

//   return new Promise((resolve, reject) => {
//     db.query(deleteTask, id, (err: any, results: any) => {
//       if (err) return reject(err);

//       return resolve(results);
//     });
//   });
// };

// tasks.put = async ({ name, phone, email, date }: Task, id: number) => {
//   const updateTask =
//     'UPDATE tasks SET name = ?, phone = ?, email = ?, date = ?  WHERE id = ?';

//   const values = [name, phone, email, date, id];

//   return new Promise((resolve, reject) => {
//     db.query(updateTask, values, (err: any, results: any) => {
//       if (err) return reject(err);

//       return resolve(results);
//     });
//   });
// };

// module.exports = tasks;
