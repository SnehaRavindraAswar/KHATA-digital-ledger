const db = require('../config/db');

// Add borrow or payment
exports.addTransaction = (req, res) => {
    const { customer_id, amount, type, note } = req.body;

    if (!customer_id || !amount || !type) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const sql = `
        INSERT INTO transaction (customer_id, amount, type, note)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [customer_id, amount, type, note], (err) => {
        if (err) return res.status(500).json({ message: 'DB error' });

        res.json({ message: 'Transaction recorded successfully' });
    });
};

// Get customer balance
exports.getBalance = (req, res) => {
    const customer_id = req.params.id;

    const sql = `
        SELECT 
        SUM(CASE WHEN type='BORROW' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type='PAY' THEN amount ELSE 0 END) AS balance
        FROM transaction
        WHERE customer_id = ?
    `;

    db.query(sql, [customer_id], (err, result) => {
        if (err) return res.status(500).json({ message: 'DB error' });

        res.json({ balance: result[0].balance || 0 });
    });
};

exports.deleteTransaction = (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM transaction WHERE transaction_id = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      res.json({ message: 'Transaction deleted' });
    }
  );
};

