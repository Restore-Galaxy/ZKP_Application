const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './data/data.db'; // Đường dẫn đến file SQLite database

// Kết nối database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Đảm bảo bảng users tồn tại
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY UNIQUE NOT NULL, password BLOB, email TEXT UNIQUE)`
  );
});

module.exports = db;
