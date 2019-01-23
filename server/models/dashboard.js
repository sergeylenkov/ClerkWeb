const db = require('../db');

module.exports.getBalance = function() {
    return new Promise((resolve, reject) => {
        db.all('SELECT a.id, a.name, a.credit_limit, c.short_name AS currency_name,\
                    (SELECT COALESCE(SUM(to_account_amount), 0) AS sum FROM transactions WHERE to_account_id = a.id AND deleted = 0) AS receipt,\
                    (SELECT COALESCE(SUM(from_account_amount), 0) AS sum FROM transactions WHERE from_account_id = a.id AND deleted = 0) AS expense\
                FROM accounts a, currencies c WHERE a.type_id = 1 AND a.active = 1 AND a.currency_id = c.id', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, receipt: row.receipt, expense: row.expense, amount: (row.receipt - row.expense), credit: row.credit_limit, currency: row.currency_name };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}