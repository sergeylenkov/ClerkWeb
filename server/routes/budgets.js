const express = require('express');
const data = require('../models/budgets');

let router = express.Router();

router.get('/', (req, res) => {
    data.getBudgets().then((items) => {
        return res.json({ items: items });
    }).catch((error) => {
        res.status(500).send({ error: error });
    });
});

module.exports = router;