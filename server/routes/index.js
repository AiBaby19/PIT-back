const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const results = await db.all();
    res.json(results);
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
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500, err);
  }
});

module.exports = router;
