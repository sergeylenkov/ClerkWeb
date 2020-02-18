const db = require('../db');

module.exports.getExchangeRates = function() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT er.from_currency_id, cf.short_name AS from_name, er.to_currency_id, ct.short_name AS to_name, rate, count, MAX(date)
                 FROM exchange_rates er, currencies cf, currencies ct
                 WHERE er.from_currency_id = cf.id AND er.to_currency_id = ct.id
              GROUP BY from_currency_id, to_currency_id`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let items = {};

                rows.forEach((row) => {
                    items[`${row.from_name}_${row.to_name}`] = row.count * row.rate;
                    items[`${row.to_name}_${row.from_name}`] = row.count / row.rate;
                });

                resolve(items);
            }
        });
    });
}