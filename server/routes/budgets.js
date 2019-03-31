const express = require('express');
const data = require('../models/budgets');

let router = express.Router();

router.get('/', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;

    data.getBudgets(from, to).then((items) => {
        return res.json({ items: items });
    }).catch((error) => {
        res.status(500).send({ error: error });
    });
});

module.exports = router;