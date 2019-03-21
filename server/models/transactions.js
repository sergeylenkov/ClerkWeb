const db = require('../db');

module.exports.getTransactions = function() {
    return new Promise((resolve, reject) => {
        db.all('SELECT a1.name AS from_account_name, a1.type_id AS from_type_id, a2.name AS to_account_name, a2.type_id AS to_type_id, t.*\
                FROM transactions t, accounts a1, accounts a2\
                WHERE t.deleted = 0 AND a1.id = t.from_account_id AND a2.id = t.to_account_id ORDER BY t.paid_at DESC, t.created_at DESC LIMIT 30', [], (err, rows) => {
            if (err) {                
                reject(err);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, date: row.paid_at, fromName: row.from_account_name, fromAmount: row.from_account_amount, toName: row.to_account_name, toAmount: row.to_account_amount, date: row.paid_at };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}