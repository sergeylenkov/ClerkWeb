const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('C:/Users/Sergey/AppData/Roaming/Clerk/Database.sqlite');

module.exports = db;