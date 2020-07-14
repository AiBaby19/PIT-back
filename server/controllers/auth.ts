import { Request, Response, NextFunction } from 'express';
import { User } from '../interfaces/User';

const express = require('express');
const { BadRequest, NotFound } = require('../utils/errors');
const db = require('../db/users');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results: any[] = await db.all();
    res.json(results).status(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('login')
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BadRequest('לא סופקו פרטים');
      }

      const user: User = await db.login(email);

      if (!user) {
        throw new NotFound('משתמש לא נמצא');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new BadRequest('שגיאה במייל או בסיסמא');
      }

      res.json(user).status(200);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, password, isAdmin } = req.body;

      if (!email || !password) {
        throw new BadRequest('לא סופקו פרטים');
      }
      password = bcrypt.hashSync(password, 10);

      const token = crypto.randomBytes(64).toString('hex');

      const results = await db.register({
        email,
        password,
        isAdmin,
        token,
      });

      if (!results.userId) {
        throw new BadRequest('משתמש לא נשמר');
      }

      res.json(results).status(200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
