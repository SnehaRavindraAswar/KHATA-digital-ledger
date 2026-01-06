const db = require('../config/db');

// Add new customer
exports.addCustomer = (req, res) => {
    const { name, mobile, email } = req.body;

    if (!name || !mobile) {
        return res.status(400).json({ message: 'Name and mobile are required' });
    }

    const sql = `INSERT INTO customer (name, mobile, email) VALUES (?, ?, ?)`;

    db.query(sql, [name, mobile, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'DB error' });
        }

        res.json({
            message: 'Customer added successfully',
            customer_id: result.insertId
        });
    });
};

// Get all customers
exports.getCustomers = (req, res) => {
    const sql = `SELECT * FROM customer`;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: 'DB error' });
        res.json(result);
    });
};

// 🔍 SEARCH customers (ADD THIS)
exports.searchCustomers = (req, res) => {
    const search = req.query.q;

    if (!search) {
        return res.status(400).json({ message: 'Search query missing' });
    }

    const sql = `
        SELECT * FROM customer
        WHERE name LIKE ?
           OR mobile LIKE ?
           OR email LIKE ?
    `;

    const value = `%${search}%`;

    db.query(sql, [value, value, value], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'DB error' });
        }

        res.json(result);
    });
};
