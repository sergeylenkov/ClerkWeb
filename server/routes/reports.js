const express = require('express');
const data = require('../models/reports');

let router = express.Router();

router.get('/expenses/by_month', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;

    data.getExpensesByMonth(from, to).then((items) => {
        return res.json({ items: items });
    }).catch((error) => {
        res.status(500).send({ error: error });
    });
});

module.exports = router;