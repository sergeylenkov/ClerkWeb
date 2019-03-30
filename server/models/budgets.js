const db = require('../db');

module.exports.getBudgets = function() {
    return new Promise((resolve, reject) => {
        db.all('SELECT b.id, b.name, b.period, b.date, b.amount, b.account_ids FROM budgets b ORDER BY b.id', [], (err, rows) => {
            if (err) {                
                reject(err);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, period: row.period, amount: row.amount, date: row.date, ids: row.account_ids };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}