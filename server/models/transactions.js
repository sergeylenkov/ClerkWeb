const db = require('../db');

module.exports.getTransactions = (from, to) => {
    return new Promise((resolve, reject) => {
        _getTransactions(from, to).then((items) => {
            let promises = [];

            items.forEach((item) => {
                const promise = _getTags(item.id).then((tags) => {
                    item.tags = tags;
                });

                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                resolve(items);
            });            
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.getRecentTransactions = (limit) => {
    return new Promise((resolve, reject) => {
        _getRecentTransactions(limit).then((items) => {
            let promises = [];

            items.forEach((item) => {
                const promise = _getTags(item.id).then((tags) => {
                    item.tags = tags;
                });

                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                resolve(items);
            });            
        }).catch((err) => {
            reject(err);
        });
    });
}

function _getTransactions(from, to) {
    return new Promise((resolve, reject) => {
        db.all('SELECT a1.name AS from_account_name, a1.type_id AS from_type_id, a2.name AS to_account_name, a2.type_id AS to_type_id, t.*\
                  FROM transactions t, accounts a1, accounts a2\
                WHERE t.deleted = 0 AND a1.id = t.from_account_id AND a2.id = t.to_account_id AND t.paid_at >= ? AND t.paid_at <= ? ORDER BY t.paid_at DESC, t.created_at DESC', [from, to], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, fromName: row.from_account_name, toName: row.to_account_name, fromAmount: row.from_account_amount, toAmount: row.to_account_amount, date: row.paid_at };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}

function _getRecentTransactions(limit) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT MAX(t.paid_at) AS paid_at, t.id, a1.name AS from_account_name, a2.name AS to_account_name\
                 FROM transactions t, accounts a1, accounts a2\
                WHERE a1.id = t.from_account_id AND a2.id = t.to_account_id GROUP BY t.from_account_id, t.to_account_id ORDER BY paid_at DESC LIMIT ?`, [limit], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, fromName: row.from_account_name, toName: row.to_account_name, date: row.paid_at };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}

function _getTags(id) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT t.id, t.name FROM transactions_tags tt, tags t WHERE tt.transaction_id = ? AND t.id = tt.tag_id`, [id], (err, rows) => {
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