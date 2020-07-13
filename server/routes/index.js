const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const results = await db.all();
    res.json(results).status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500, err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const results = await db.one(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500, err);
  }
});

router.post('/', async (req, res, next) => {
  const task = req.body;

  try {
    const results = await db.post(task);
    res.json('success').status(200);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.json('email already exists').status(400);
    }
    res.sendStatus(500, err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const results = await db.delete(req.params.id);
    res.json('success').status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500, err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const results = await db.put(req.body, req.params.id);
    res.json('success').status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500, err);
  }
});

module.exports = router;
