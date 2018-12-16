const db = require('../db');

module.exports.getAccounts = function() {
    return new Promise((resolve, reject) => {
        db.all('SELECT a.id, a.name FROM accounts a WHERE a.active = 1', [], (err, rows) => {
            if (err) {                
                reject(err);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}