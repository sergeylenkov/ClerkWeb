const express = require('express');
const data = require('../models/transactions');

let router = express.Router();

router.get('/', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;

    data.getTransactions(from, to).then((items) => {
        return res.json({ items: items });
    }).catch((error) => {
        res.status(500).send({ error: error });
    });
});

router.get('/recent', (req, res) => {
    const limit = req.query.limit;

    data.getRecentTransactions(limit).then((items) => {
        return res.json({ items: items });
    }).catch((error) => {
        res.status(500).send({ error: error });
    });
});

module.exports = router;