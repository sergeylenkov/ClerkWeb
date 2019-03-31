const db = require('../db');

module.exports.getBudgets = (from, to) => {
    return new Promise((resolve, reject) => {
        _getBudgets().then((items) => {
            let promises = [];

            items.forEach((item) => {
                const promise = _getBudgetExpense(item.ids, from, to).then((balance) => {
                    item.balance = balance;
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

function _getBudgets() {
    return new Promise((resolve, reject) => {
        db.all('SELECT b.id, b.name, b.amount, b.period, b.account_ids FROM budgets b', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let items = [];
    
                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, amount: row.amount, period: row.period, ids: row.account_ids, balance: 0 };
                    items.push(item);
                });
    
                resolve(items);
            }
        });
    });
}

function _getBudgetExpense(ids, from, to) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT TOTAL(t.to_account_amount) AS sum FROM transactions t, accounts a WHERE a.type_id = 2 AND t.to_account_id IN(${ids}) AND t.to_account_id = a.id AND t.paid_at >= ? AND t.paid_at <= ? AND t.deleted = 0`, [from, to], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.sum);
            }
        });
    });
}