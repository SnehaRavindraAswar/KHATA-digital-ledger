const db = require('../config/db');
const jwt = require('jsonwebtoken');


exports.login = (req, res) => {
  console.log('LOGIN BODY:', req.body); // 👈 MUST PRINT

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  const sql = 'SELECT * FROM admin WHERE username = ? AND password = ?';

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = result[0];

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token
    });
  });
};
