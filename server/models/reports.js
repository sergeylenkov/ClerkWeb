const moment = require('moment');

const db = require('../db');

module.exports.getExpensesByMonth = (from, to) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT t.paid_at AS date, TOTAL(t.from_account_amount) AS sum FROM transactions t, accounts a
                 WHERE t.deleted = 0 AND t.paid_at >= ? AND t.paid_at <= ? AND t.to_account_id = a.id AND (a.type_id = 2 OR a.type_id = 3)
                 GROUP BY strftime('%Y %m', t.paid_at) ORDER BY date`, [from, to], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];
                let promises = [];

                rows.forEach((row) => {
                    const date = moment(row.date);

                    let item = { date: date, total: row.sum };
                    items.push(item);

                    const promise = _getExpensesForMonth(date.format('YYYY MM')).then((expenses) => {
                        item.expenses = expenses;
                    });

                    promises.push(promise);
                });

                Promise.all(promises).then(() => {
                    resolve(items);
                })
            }
        });
    });
}

function _getExpensesForMonth(date) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT a.id, a.name, TOTAL(t.from_account_amount) AS sum FROM transactions t, accounts a
                 WHERE t.deleted = 0 AND t.to_account_id = a.id AND (a.type_id = 2 OR a.type_id = 3) AND strftime('%Y %m', t.paid_at) = ?
                 GROUP BY strftime('%Y %m', t.paid_at), a.id ORDER BY sum DESC`, [date], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, amount: row.sum };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}