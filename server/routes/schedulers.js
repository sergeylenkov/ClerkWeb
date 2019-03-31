const express = require('express');
const data = require('../models/schedulers');

let router = express.Router();

router.get('/', (req, res) => {
    data.getSchedulers().then((items) => {
        return res.json({ items: items });
    }).catch((error) => {
        res.status(500).send({ error: error });
    });
});

module.exports = router;