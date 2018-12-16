const express = require('express');
const db = require('../db');
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

module.exports = router;