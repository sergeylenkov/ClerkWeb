const db = require('../db');

module.exports.getSchedulers = function() {
    return new Promise((resolve, reject) => {
        db.all('SELECT s.id, s.name, s.from_account_amount, s.to_account_amount, s.next_date, s.active FROM schedulers s ORDER BY s.id', [], (err, rows) => {
            if (err) {                
                reject(err);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, nextDate: row.next_date, active: row.active, fromAmount: row.from_account_amount, toAmount: row.to_account_amount };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}