const express = require('express');
import { Request, Response, NextFunction } from 'express';

const { BadRequest, NotFound } = require('../utils/errors');

const db = require('../db/users');
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
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BadRequest('לא סופקו פרטים');
      }
      const user: string = await db.login(email, password);

      if (!user) {
        throw new NotFound('משתמש לא נמצא');
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
      const { email, password, isAdmin } = req.body;

      if (!email || !password) {
        throw new BadRequest('לא סופקו פרטים');
      }

      const results = await db.register({ email, password, isAdmin });

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
