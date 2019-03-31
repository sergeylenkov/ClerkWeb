const db = require('../db');

module.exports.getTags = function() {
    return new Promise((resolve, reject) => {
        db.all('SELECT t.id, t.name, COUNT(t.id) AS count FROM tags t, transactions_tags tt WHERE t.id = tt.tag_id GROUP BY t.id ORDER BY t.name', [], (err, rows) => {
            if (err) {                
                reject(err);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, count: row.count };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}