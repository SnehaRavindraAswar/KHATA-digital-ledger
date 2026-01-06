const db = require('../config/db');

exports.getStats = (req, res) => {
  const stats = {};

  const customerCountQuery = 'SELECT COUNT(*) AS totalCustomers FROM customer';
  const borrowSumQuery = 'SELECT SUM(amount) AS totalBorrow FROM borrow';
  const paidSumQuery = 'SELECT SUM(amount) AS totalPaid FROM transaction WHERE type="PAYMENT"';

  db.query(customerCountQuery, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    stats.totalCustomers = result[0].totalCustomers || 0;

    db.query(borrowSumQuery, (err, result) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      stats.totalBorrow = result[0].totalBorrow || 0;

      db.query(paidSumQuery, (err, result) => {
        if (err) return res.status(500).json({ message: 'DB error' });
        stats.totalPaid = result[0].totalPaid || 0;

        stats.remaining = stats.totalBorrow - stats.totalPaid;

        res.json(stats);
      });
    });
  });
};
