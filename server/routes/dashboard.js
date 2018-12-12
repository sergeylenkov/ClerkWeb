const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(404);
});

router.get('/balance', (req, res) => {
    const items = [
        { amount: 1000, currency: '$' },
        { amount: 2000, currency: 'р.' },
    ];

    return res.json({ items: items });
});

module.exports = router;