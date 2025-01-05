const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Đăng ký người dùng
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ ok: false, message: 'All fields are required' });
  }

  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.run(query, [username, email, password], (err) => {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ ok: false, message: 'Email already registered' });
      }
      return res.status(500).json({ ok: false, message: 'Database error' });
    }
    res.status(200).json({ ok: true, message: 'User registered successfully' });
  });
});

// Đăng nhập người dùng
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'All fields are required' });
  }

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(query, [email, password], (err, row) => {
    if (err) {
      return res.status(500).json({ ok: false, message: 'Database error' });
    }

    if (row) {
      res.status(200).json({ ok: true, message: 'Login successful', user: row });
    } else {
      res.status(401).json({ ok: false, message: 'Invalid email or password' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
