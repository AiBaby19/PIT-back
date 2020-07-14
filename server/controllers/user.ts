const express = require('express');
import { Request, Response, NextFunction } from 'express';

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
    const email = req.body.email;
    const password = req.body.password;
    let answer = { success: '', failed: '' };

    try {
      const results: string = await db.login(email, password);
      if (!results) {
        answer.failed = 'User dont exists';
        res.json(answer).status(400);
      } else {
        console.log('r', results);
        answer.success = results;
        res.json(answer).status(200);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    let answer = { success: '', failed: '' };
    try {
      const results = await db.register(user);
      answer.success = results;
      res.json(answer).status(200);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        answer.failed = 'email already exists';
        return res.json(answer).status(400);
      }
      res.sendStatus(500);
    }
  }
);

module.exports = router;
