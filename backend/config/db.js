const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sneha@2005',
    database: 'khata_db'
});

db.connect(err => {
    if (err) {
        console.log('Database connection failed ❌');
    } else {
        console.log('MySQL Connected ✅');
    }
});

module.exports = db;
