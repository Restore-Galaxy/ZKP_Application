const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');
const crypto = require("crypto");
const { groth16 } = require('snarkjs');
const fs = require('fs');

const app = express();
const PORT = 5000;
const SALT_ROUNDS = 10;
const MAX_SIZE = 1000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Đăng ký người dùng
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ ok: false, message: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(query, [username, email, hashedPassword], async (err) => {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(400).json({ ok: false, message: 'Email already registered' });
        }
        return res.status(500).json({ ok: false, message: 'Database error' });
      }
      // User registered successfully
      res.status(200).json({ ok: true, message: 'User registered successfully' });

      // Check if user was HUST student
      if (email.endsWith('@sis.hust.edu.vn')) {
        // Add user to approved list
        const addQuery = `INSERT INTO approved_users (email) VALUES (?)`;
        // const hashedEmail = crypto.createHash("sha256").update(email).digest("hex");
        const hash = crypto.createHash("sha256").update(email).digest();

        let hashedEmail = BigInt("0x" + hash.toString("hex")).toString(10);
        // Log user email out
        // console.log(hashedEmail);

        db.run(addQuery, [hashedEmail], (err) => {
          if (err) {
            console.error('Error adding user to approved list:', err);
          }
        });

        // hash email again
        // const hashedEmail2 = crypto.createHash("sha256").update(email).digest("hex");
        // console.log(hashedEmail2);
      }
      
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error hashing password' });
  }
});

// Đăng nhập người dùng
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'All fields are required' });
  }

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ ok: false, message: 'Database error' });
    }

    if (row) {
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, row.password);
      if (isMatch) {
        return res.status(200).json({ ok: true, message: 'Login successful', user: row });
      } else {
        return res.status(401).json({ ok: false, message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ ok: false, message: 'Invalid email or password' });
    }
  });
});

app.post('/verify', async (req, res) => {
  const { email } = req.body;
  // const emailHash = crypto.createHash("sha256").update(email).digest("hex");
  const hash = crypto.createHash("sha256").update(email).digest();
  let emailHash = BigInt("0x" + hash.toString("hex")).toString(10);

  var preApprovedHashes = [];
  // Get the pre-approved hashes from the database
  const query = `SELECT * FROM approved_users`;
  db.all(query, [], async (err, rows) => {
    if (err) {
      console.log("preApprovedHashes error");
      return res.status(500).json({ ok: false, message: 'Database error' });
    }
    
    if (rows) {
      var ret = false;
      var n = rows.length;
      var index = 0;
      while (n > 0) {
        var size = Math.min(n, MAX_SIZE);
        preApprovedHashes = [];

        for (let i = index; i < index + size; i++) {
          preApprovedHashes.push(rows[i].email);
        }
        for (let i = index + size; i < index + MAX_SIZE; i++) {
          preApprovedHashes.push(0);
        }

        var temp = await prove(emailHash, size, preApprovedHashes);
        ret = ret | temp;

        if (ret) break;

        n -= size;
        index += size;
      }
      
      if (ret) {
        return res.status(200).json({ ok: true, message: 'Email is authorized' });
      }
      else {
        return res.status(200).json({ ok: false, message: 'Email is not authorized' });
      }
    }
    
  });
});

async function prove(emailHash, n, preApprovedHashes) {
  // Prepare inputs for the circuit
  const circuitInputs = {
    emailHash,
    n,
    preApprovedHashes,
  };

  try {
    // Generate proof
    const { proof, publicSignals } = await groth16.fullProve(
      circuitInputs,
      'circuit/emailCheck.wasm',
      'circuit/emailCheck.zkey'
    );

    // Load the verification key
    const vKey = JSON.parse(fs.readFileSync('circuit/verification_key.json', 'utf-8'));

    // Verify proof
    const isValid = await groth16.verify(vKey, publicSignals, proof);

    return isValid ? publicSignals[0] : false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
