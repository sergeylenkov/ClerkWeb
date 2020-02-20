const express = require('express');
const data = require('../models/dashboard');

let router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(404);
});

router.get('/balance', (req, res) => {
  data.getBalance().then((items) => {
    return res.json({ items: items });
  }).catch((error) => {
    res.status(500).send({ error: error });
  });
});

router.get('/expenses', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  data.getExpenses(from, to).then((items) => {
    return res.json({ items: items });
  }).catch((error) => {
    res.status(500).send({ error: error });
  });
});

router.get('/receipts', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  data.getReceipts(from, to).then((items) => {
    return res.json({ items: items });
  }).catch((error) => {
    res.status(500).send({ error: error });
  });
});

router.get('/budgets', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  data.getBudgets(from, to).then((items) => {
    return res.json({ items: items });
  }).catch((error) => {
    res.status(500).send({ error: error });
  });
});

router.get('/goals', (req, res) => {
  data.getGoals().then((items) => {
    return res.json({ items: items });
  }).catch((error) => {
    res.status(500).send({ error: error });
  });
});

router.get('/debts', (req, res) => {
  data.getDebts().then((items) => {
    return res.json({ items: items });
  }).catch((error) => {
    res.status(500).send({ error: error });
  });
});

router.get('/schedulers', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  data.getSchedulers(from, to).then((items) => {
    return res.json({ items: items });
  }).catch((error) => {
    res.status(500).send({ error: error });
  });
});

module.exports = router;