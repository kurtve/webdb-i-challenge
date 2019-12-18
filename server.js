const express = require('express');
const db = require('./data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const accounts = await db('accounts');
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const account = await db('accounts')
      .where('id', id)
      .first();
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    const [id] = await db('accounts').insert(payload);
    const newAccount = await db('accounts')
      .where('id', id)
      .first();
    res.json(newAccount);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    const id = Number.parseInt(req.params.id);
    await db('accounts')
      .where('id', id)
      .update(payload);
    const updatedAccount = await db('accounts')
      .where('id', id)
      .first();
    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const lines = await db('accounts')
      .where('id', id)
      .del();
    res.status(202).json({ 'records deleted': lines });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
