// const express = require('express');
// import { Request, Response, NextFunction } from 'express';

// import Task from '../interfaces/Task';

// const db = require('../db');
// const router = express.Router();

// router.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const results: Task[] = await db.all();
//     res.json(results).status(200);
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });

// router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const results: Task = await db.one(req.params.id);
//     res.json(results);
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });

// router.post('/', async (req: Request, res: Response, next: NextFunction) => {
//   const task = req.body;

//   try {
//     const results = await db.post(task);
//     res.json('success').status(200);
//   } catch (err) {
//     if (err.code === 'ER_DUP_ENTRY') {
//       return res.json('email already exists').status(400);
//     }
//     res.sendStatus(500);
//   }
// });

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

// module.exports = router;
