const express = require('express');
import { Request, Response, NextFunction } from 'express';

// import User from '../interfaces/User';

const db = require('../db/users');
const router = express.Router();
// build here

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

// router.delete(
//   '/:id',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const results = await db.delete(req.params.id);
//       res.json('success').status(200);
//     } catch (err) {
//       res.sendStatus(500);
//     }
//   }
// );

// router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const results = await db.put(req.body, req.params.id);
//     res.json('success').status(200);
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });

module.exports = router;
