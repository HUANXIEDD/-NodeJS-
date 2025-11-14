const mysql2 = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = mysql2.createPool({
    host: process.env.MySQLhost,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
    connection.release();
});

const sqlCheckFromUserlogin = 'SELECT * FROM User WHERE username = ?';

const sqlInsertFromUserlogin = 'INSERT INTO User (username, password) VALUES (?, ?)';

const sendMessage = 'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)';

module.exports = {
    pool : pool.promise(),
    sqlCheckFromUserlogin,
    sqlInsertFromUserlogin,
    sendMessage,
}