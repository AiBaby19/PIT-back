import { User } from '../interfaces/User';
const db = require('./index');
const crypto = require('crypto');

interface DB {
  all: () => void;
  auth: (userId: number, token: string) => void;
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

users.auth = (userId: number, token: string) => {
    console.log(userId, token)
  const getUser = 'SELECT isAdmin FROM users WHERE id = ? AND token = ?';

  return new Promise((resolve, reject) => {
    db.query(getUser, [userId, token], (err: any, results: any) => {
      if (err) {
        return reject(err);
      }

      return resolve(!!results[0]?.isAdmin);
    });
  });
};

users.login = (email: string, password: string) => {
  const getUser = 'SELECT id as userId, token FROM users WHERE email = ? AND password = ?';

  return new Promise((resolve, reject) => {
    db.query(getUser, [email, password], (err: any, results: any) => {
      if (err) return reject(err);
      
      return resolve(results[0]);
    });
  });
};

users.register = async ({ email, password, isAdmin }: User) => {
  const token = crypto.randomBytes(64).toString('hex');

  const insertUser =
    'INSERT INTO users(email, password, isAdmin, token) values(?, ?, ?, ?)';

  const values = [email.toLowerCase(), password, isAdmin, token];

  return new Promise((resolve, reject) => {
    db.query(insertUser, values, (err: any, results: any) => {
      if (err) {
        return reject(err);
      }

      return resolve({ token, userId: results?.insertId });
    });
  });
};

module.exports = users;
