const db = require('../db');

module.exports.getGoals = () => {
    return new Promise((resolve, reject) => {
        _getGoals().then((items) => {
            let promises = [];

            items.forEach((item) => {
                const promise = _getGoalBalance(item.ids).then((balance) => {
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

function _getGoals() {
    return new Promise((resolve, reject) => {
        db.all('SELECT g.id, g.name, g.date, g.amount, g.account_ids FROM goals g', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let items = [];
    
                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, date: row.date, amount: row.amount, ids: row.account_ids, balance: 0 };
                    items.push(item);
                });
    
                resolve(items);
            }
        });
    });
}

function _getGoalBalance(ids) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT TOTAL(to_account_amount) AS sum FROM transactions WHERE to_account_id IN(${ids}) AND deleted = 0`, [], (err, row) => {
            if (err) {
                reject(err);
            } else {
                const receipt = row.sum;
                
                db.get(`SELECT TOTAL(from_account_amount) AS sum FROM transactions WHERE from_account_id IN(${ids}) AND deleted = 0`, [], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        const expense = row.sum;
                        const balance = receipt - expense;

                        resolve(balance);
                    }
                });
            }
        });
    });
}