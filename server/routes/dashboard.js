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

router.get('/credits', (req, res) => {
    data.getCredits().then((items) => {
        return res.json({ items: items });
    }).catch((error) => {
        res.status(500).send({ error: error });
    });
});


module.exports = router;