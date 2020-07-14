import { User } from '../interfaces/User';
const db = require('./index');

interface DB {
  all: () => void;
  auth: (user: any) => void;
  login: (email: string, password: string) => void;
  register: (user: User) => void;
}

// @ts-ignore
const users: DB = {};

users.all = () => {
  const getAllUsers = 'SELECT * FROM users';

  return new Promise((resolve, reject) => {
    db.query(getAllUsers, (err: any, results: any) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

users.auth = (user: any) => {
  const getUser = 'SELECT isAdmin FROM users WHERE password = ?';
  return new Promise((resolve, reject) => {
    db.query(getUser, user, (err: any, results: any) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(!!results[0].isAdmin);
    });
  });
};

users.login = (email: string, password: string) => {
  const getUser = 'SELECT password FROM users WHERE email = ? AND password = ?';

  return new Promise((resolve, reject) => {
    db.query(getUser, [email, password], (err: any, results: any) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(results[0]?.password);
    });
  });
};

users.register = async ({ email, password, isAdmin }: User) => {
  const insertUser =
    'INSERT INTO users(email, password, isAdmin) values(?, ?, ?)';

  const values = [email.toLowerCase(), password, isAdmin];
  return new Promise((resolve, reject) => {
    db.query(insertUser, values, (err: any, results: any) => {
      if (err) return reject(err);

      return resolve(password);
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

module.exports = users;
