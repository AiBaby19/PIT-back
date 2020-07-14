const express = require('express');
import { Request, Response, NextFunction } from 'express';
const { BadRequest, NotFound } = require('../utils/errors');

import Task from '../interfaces/Task';

const db = require('../db/tasks');
const userDB = require('../db/users');

const router = express.Router();

router.get(
  '/by-user/:user/:token',
  async (req: Request, res: Response, next: NextFunction) => {
    const isAdmin = await userDB.auth(req.params.user, req.params.token);
    try {
      const results: Task[] = isAdmin
        ? await db.all()
        : await db.byUser(req.params.user);
      res.json(results).status(200);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results: Task = await db.one(req.params.id);
    if (!results) {
      throw new NotFound('משתמש לא נמצא');
    }
    res.json(results).status(200);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const task = req.body;
  try {
    const results = await db.post(task);
    res.json(results).status(200);
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await db.delete(req.params.id);
      res.json(results).status(200);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await db.put(req.body, req.params.id);
    res.json(results).status(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
